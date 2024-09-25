package store

import (
	"encoding/json"
	"log"
	"os"

	"univboard/models"
)

type Config = models.Config
type Data = models.History

var (
	CONFIG_PATH = os.Getenv("HOME") + "/.config/univboard"
)

// initializes the local storage
func Init() error {
	os.MkdirAll(CONFIG_PATH, 0755)

	// create the config.json and data.json file if it doesn't exist
	if err := ensureFileExists(CONFIG_PATH+"/config.json", &Config{
		HistoryLimit:  100,
		SyncInterval:  60,
		EncryptionKey: "",
	}); err != nil {
		return err
	}

	// create the data.json file if it doesn't exist
	if err := ensureFileExists(CONFIG_PATH+"/data.json", &Data{
		Items:       []models.ClipboardItem{},
		PinnedItems: []models.ClipboardItem{},
	}); err != nil {
		return err
	}

	return nil
}

// Load loads the data from a JSON file.
func Load[T any](filePath string) (*T, error) {
	bytes, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var data T
	if err := json.Unmarshal(bytes, &data); err != nil {
		return nil, err
	}

	return &data, nil
}

// Save saves the data to a JSON file.
func Save[T any](filePath string, data *T) error {
	bytes, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		return err
	}

	if err := os.WriteFile(filePath, bytes, 0644); err != nil {
		return err
	}

	return nil
}

// EnsureFileExists checks if the file exists and creates it with default values if it doesn't.
func ensureFileExists[T any](filePath string, defaultData *T) error {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		log.Printf("%s file not found, creating with default values\n", filePath)
		return Save(filePath, defaultData)
	} else if err != nil {
		return err
	}
	return nil
}
