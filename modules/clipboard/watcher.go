package watcher

import (
	"context"
	"sync"
	"time"

	"univboard/models"
	"univboard/modules/emitter"
	"univboard/modules/utils"

	"golang.design/x/clipboard"
)

// DataProcessor defines a function type for processing clipboard data
type DataProcessor func([]byte) interface{}
type WatcherConfig struct {
	Format        clipboard.Format
	EventName     string
	DataProcessor DataProcessor
}

func watch(ctx context.Context, format clipboard.Format, eventName string, dataProcessor DataProcessor, history *models.History, mutex *sync.Mutex) {
	change := clipboard.Watch(ctx, format)

	// Run the watcher in a separate goroutine
	go func() {
		for {
			select {
				case data := <-change:
					if len(data) > 0 {
						processedData := dataProcessor(data)

						// Add the item to the history and emit the event
						item := models.NewClipboardItem(
							processedData.(string),
							utils.GetDeviceDetails().DeviceName,
							time.Now().UnixMilli(),
						)

						// ensure no data races because of goroutines
						mutex.Lock()
						history.Items = append(history.Items, item)
						mutex.Unlock()

						emitter.Event(ctx, eventName, processedData)
					}
				case <-ctx.Done():
					return
			}
		}
	}()
}

func Init(ctx context.Context, configs []WatcherConfig, history *models.History) {
	var historyMutex sync.Mutex

	for _, config := range configs {
		watch(ctx, config.Format, config.EventName, config.DataProcessor, history, &historyMutex)
	}
}
