import os from "os"

export function getIp() {
  const networkInterfaces = os.networkInterfaces();
  const networkInterfacesKeys = Object.keys(networkInterfaces)
  const ips = networkInterfacesKeys.reduce((previousValue, currentValue) => {
    return [...previousValue, ...networkInterfaces[currentValue]]
  }, [])

  const ip = ips.filter((item) => {
    return item.family === "IPv4" && item.address !== "127.0.0.1" && !item.internal
  })[0].address
  return ip
}
