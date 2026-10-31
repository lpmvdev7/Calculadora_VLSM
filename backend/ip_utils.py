def total_ipv4_hosts():
    total_hosts = []
    for i in range(1,33):
        network_size = {
            "bits": i,
            "total_hosts":(2**i)-2
        }
        total_hosts.append(network_size)
    return total_hosts

def convertToIpFormat(ipv4:list[int]):
    ip_string = ".".join(map(str, ipv4))
    return ip_string


def maxPossibleHosts(number_hosts:int)->int:
    for hosts in total_ipv4_hosts():
        if number_hosts <= hosts["total_hosts"]:
            return hosts["total_hosts"]
