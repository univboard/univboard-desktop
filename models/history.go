package models

import (
	"time"
)

// History represents the clipboard history.
type History struct {
	Items       []ClipboardItem `json:"items"`
	PinnedItems []ClipboardItem `json:"pinned_items"`
}

// ClipboardItem represents an individual item in the clipboard history.
type ClipboardItem struct {
	Content    string `json:"content"`
	Timestamp  string `json:"timestamp"`
	DeviceName string `json:"device_name"`
	DeviceID   string `json:"device_id"`
}

// NewClipboardItem creates a new ClipboardItem and sets the date string.
func NewClipboardItem(content, deviceName, deviceID string, timestamp int64) ClipboardItem {
	return ClipboardItem{
		Content:    content,
		Timestamp:  time.Unix(timestamp, 0).String(),
		DeviceName: deviceName,
		DeviceID:   deviceID,
	}
}