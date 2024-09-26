package models

// Device represents the details of a device.
type Device struct {
	DeviceID     string `json:"device_id"`
	DeviceName   string `json:"device_name"`
	Platform     string `json:"platform"`
	LastSyncTime int64 `json:"last_sync_time"`
}

// NewDevice creates a new Device instance.
func NewDevice(deviceID, deviceName, platform string, lastSyncTime int64) Device {
	return Device{
		DeviceID:     deviceID,
		DeviceName:   deviceName,
		Platform:     platform,
		LastSyncTime: lastSyncTime,
	}
}
