package watcher

import (
	"context"

	"univboard/modules/emitter"

	"golang.design/x/clipboard"
)

var (
	TEXT_COPIED    = "text_copied"
	TEXT_RECEIVED  = "text_received"
	IMAGE_COPIED   = "image_copied"
	IMAGE_RECEIVED = "image_received"
)

// DataProcessor defines a function type for processing clipboard data
type DataProcessor func([]byte) interface{}
type WatcherConfig struct {
	Format        clipboard.Format
	EventName     string
	DataProcessor DataProcessor
}

func watch(ctx context.Context, format clipboard.Format, eventName string, dataProcessor DataProcessor) {
	change := clipboard.Watch(ctx, format)

	// Run the watcher in a separate goroutine
	go func() {
		for {
			select {
				case data := <-change:
					if len(data) > 0 {
						processedData := dataProcessor(data)
						emitter.Event(ctx, eventName, processedData)
					}
				case <-ctx.Done():
					return
			}
		}
	}()
}

func Init(ctx context.Context, configs []WatcherConfig) {
	for _, config := range configs {
		watch(ctx, config.Format, config.EventName, config.DataProcessor)
	}
}
