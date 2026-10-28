def convertToIpFormat(ipv4:list[int]):
    ip_string = ".".join(map(str, ipv4))
    return ip_string