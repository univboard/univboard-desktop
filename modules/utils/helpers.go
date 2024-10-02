package utils

import (
	"encoding/json"
)

// ToJson converts a data to a JSON string.
func ToJson[T any](data T) string {
	bytes, _ := json.Marshal(data)
	return string(bytes)
}