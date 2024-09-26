package utils

import (
	"time"

	"univboard/models"

	"github.com/shirou/gopsutil/host"
)

func GetDeviceDetails() models.Device {
	info, _ := host.Info()

	return models.NewDevice(
		info.HostID,
		info.Hostname,
		info.OS,
		time.Now().UnixMilli(),
	)
}