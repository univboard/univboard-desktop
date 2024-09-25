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
  - [ ] network discovery
  - [ ] device registration
    - [ ] alias
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
