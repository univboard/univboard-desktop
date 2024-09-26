package models

// History represents the clipboard history.
type History struct {
	Items       []ClipboardItem `json:"items"`
	PinnedItems []ClipboardItem `json:"pinned_items"`
}

// ClipboardItem represents an individual item in the clipboard history.
type ClipboardItem struct {
	Content    string `json:"content"`
	Timestamp  int64 `json:"timestamp"`
	DeviceName string `json:"device_name"`
}

// NewClipboardItem creates a new ClipboardItem and sets the date string.
func NewClipboardItem(content string, deviceName string, timestamp int64) ClipboardItem {
	return ClipboardItem{
		Content:    content,
		Timestamp:  timestamp,
		DeviceName: deviceName,
	}
}