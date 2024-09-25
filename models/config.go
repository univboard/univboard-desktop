package models

// Config represents the configuration settings for the universal clipboard project.
type Config struct {
	HistoryLimit  int    `json:"history_limit"`
	SyncInterval  int    `json:"sync_interval"`
	EncryptionKey string `json:"encryption_key"`
}


