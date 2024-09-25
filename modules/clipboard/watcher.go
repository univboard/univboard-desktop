package clipboard

import (
	"context"

	"univboard/modules/emitter"
	"golang.design/x/clipboard"
)

var (
	TEXT_COPIED = "text_copied"
	TEXT_RECEIVED = "text_received"
)

func InitWatcher(ctx context.Context) error {
	err := clipboard.Init()
	if err != nil {
		return err
	}

	change := clipboard.Watch(ctx, clipboard.FmtText)
	emitter.Event(ctx, TEXT_COPIED, string(<- change))

	return nil
}