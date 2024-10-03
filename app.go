package main

import (
	"context"
	"encoding/base64"
	"log"

	"univboard/models"
	watcher "univboard/modules/clipboard"
	"univboard/modules/emitter"
	"univboard/modules/store"
	common "univboard/modules/utils"

	"golang.design/x/clipboard"
)

// App struct
type App struct {
	ctx context.Context
}

var config *models.Config
var localHistory *models.History

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx

	// Initialize the store
	if err := store.Init(); err != nil {
		log.Println(err)
		emitter.Error(ctx, err)
	}

	// Load the configuration
	if cfg, err := store.Load[models.Config](store.CONFIG_FILE); err != nil {
		emitter.Error(ctx, err)
	} else {
		config = cfg
	}

	// Load the clipboard history
	if history, err := store.Load[store.Data](store.DATA_FILE); err != nil {
		emitter.Error(ctx, err)
	} else {
		localHistory = history
	}

	// Initialize the clipboard and watchers
	if err := clipboard.Init(); err != nil {
		log.Println(err)
		emitter.Error(ctx, err)
	}

	watcher.Init(ctx, []watcher.WatcherConfig{
		{
			Format:    clipboard.FmtText,
			EventName: common.TEXT_COPIED,
			DataProcessor: func(data []byte) interface{} {
				return string(data)
			},
		},
		{
			Format:    clipboard.FmtImage,
			EventName: common.IMAGE_COPIED,
			DataProcessor: func(data []byte) interface{} {
				return base64.StdEncoding.EncodeToString(data)
			},
		},
	}, localHistory)
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	// Expire items older than user specified limit
	common.Expire(config.HistoryLimit, localHistory)

	// Save the updated clipboard history
	if err := store.Save(store.DATA_FILE, localHistory); err != nil {
		emitter.Error(ctx, err)
		return true
	}

	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here

	// cancel the context to close all running ops
	a.ctx.Done()
}

// Returns the stringified clipboard history
func (a *App) LoadHistory() string {
	return common.ToJson[models.History](*localHistory)
}