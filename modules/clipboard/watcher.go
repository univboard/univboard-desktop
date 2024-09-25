package clipboard

import (
	"encoding/base64"
	"context"

	"univboard/modules/emitter"
	"golang.design/x/clipboard"
)

var (
	TEXT_COPIED = "text_copied"
	TEXT_RECEIVED = "text_received"
	IMAGE_COPIED = "image_copied"
	IMAGE_RECEIVED = "image_received"
)

func InitTextWatcher(ctx context.Context) error {
	err := clipboard.Init()
	if err != nil {
		return err
	}

	change := clipboard.Watch(ctx, clipboard.FmtText)
	emitter.Event(ctx, TEXT_COPIED, string(<- change))

	return nil
}

func InitImageWatcher(ctx context.Context) error {
	err := clipboard.Init()
	if err != nil {
		return err
	}

	change := clipboard.Watch(ctx, clipboard.FmtImage)

	// convert the image data to base64 string
	base64_str := base64.StdEncoding.EncodeToString(<- change)
	emitter.Event(ctx, IMAGE_COPIED, base64_str)

	return nil
}