package utils

import (
	"time"

	"univboard/models"
)

// Removes the items from history.items that are older than interval
func Expire(limit int, history *models.History) {
	for i := 0; i < len(history.Items); i++ {
		itemTimestamp := time.Unix(history.Items[i].Timestamp, 0)
		expirationTime := itemTimestamp.Add(time.Duration(limit) * 24 * time.Hour)

		if time.Now().After(expirationTime) {
			history.Items = append(history.Items[:i], history.Items[i+1:]...)
		}
	}
}