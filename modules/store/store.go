package store

import (
	"os"
	"log"
)

var (
	CONFIG_PATH = os.Getenv("HOME") + "/.config/univboard"
)

// initializes the local storage
func Init() error {
	os.MkdirAll(CONFIG_PATH, 0755)

	// create the config.json and data.json file if it doesn't exist
	if err := ensureConfigFileExists("/config.json"); err != nil {
		return err
	}

  // create the data.json file if it doesn't exist
	if err := ensureConfigFileExists("/data.json"); err != nil {
		return err
	}

	return nil
}

func ensureConfigFileExists(file string) error {
    configFilePath := CONFIG_PATH + file

    if _, err := os.Stat(configFilePath); os.IsNotExist(err) {
        log.Printf("%v file not found", file)

        if _, createErr := os.Create(configFilePath); createErr != nil {
            return createErr
        }
    } else if err != nil {
        return err
    }
		
    return nil
}
