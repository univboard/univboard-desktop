# univboard

A universal clipboard that syncs clipboard data between devices connected to the same network.

## Installation
- Download the latest release from the [releases page]()
- Build from source
  - Clone the repository
  - Run `wails build`
  - Run the binary from the `build` directory (available under `/build/<os>/` )

## TODO
- [ ] server
  - [ ] network discovery (multicast/HTTP)
    - [ ] bind traffic to a port
    - [ ] avoid self-discovery (password/fingerprint)
    - [ ] generate TLS/SSL certificate on device (auto)
  - [ ] device registration
    - [ ] alias + other details (user provided)
  - [ ] choose what device to sync to/with
- [ ] clipboard
  - [ ] send clipboard data
  - [ ] receive clipboard data
- [ ] notifications (not in wails)
  - [ ] CTA click 
- [ ] storage
  - [ ] config file
  - [ ] clipboard history
  - [ ] device list
- [ ] UI
  - [ ] design
  - [ ] clipboard history
  - [ ] errors as toast
  - [ ] settings

## Planned Features
- [ ] sync with selected devices
- [ ] (?) account based sync (would deviate from local network sync)
