package emitter

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

/* 
	EmitError emits an error event to the front-end
*/
func Error(ctx context.Context, err error) {
	runtime.EventsEmit(ctx, "error", err.Error())
}

/*
	EmitEvent emits an event to the front-end
*/
func Event(ctx context.Context, event string, data interface{}) {
	runtime.EventsEmit(ctx, event, data)
}