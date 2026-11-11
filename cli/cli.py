
from consume import get_vlsm, post_vlsm
from rich.console import Console
from rich.table import Table
import click
import requests

console = Console()


@click.group()
def cli():
    """CLI para la calculadora VLSM"""
    pass


@cli.command()
@click.argument("subnets", type=click.IntRange(min=1))
@click.argument("hosts", nargs=-1, type=click.IntRange(min=1))
@click.option(
    "--format",
    "output_format",
    type=click.Choice(["table", "tsv"]),
    default="table"
)
def calc(subnets, hosts, output_format):
    """Calcula subredes usando VLSM"""

    if len(hosts) != subnets:
        raise click.BadParameter(
            f"Debes proporcionar {subnets} cantidades de hosts. "
            f"Proporcionaste {len(hosts)}."
        )

    try:
        post_vlsm(subnets, list(hosts))
        result = get_vlsm()

        if output_format == "tsv":

            click.echo(
                "Id\tHosts_posibles\tNumero_hosts\tPrefijo_red\tMascara\tIp_red\tBroadcast\tPrimera_IP\tUltima_IP"
            )

            for subnet in result:
                click.echo(
                    f"{subnet['id']}\t"
                    f"{subnet['hosts_posibles']}\t"
                    f"{subnet['numero_hosts']}\t"
                    f"{subnet['prefijo_red']}\t"
                    f"{subnet['mascara']}\t"
                    f"{subnet['rango']['First']}\t"
                    f"{subnet['rango']['Last']}\t"
                    f"{subnet['rango']['First_usable']}\t"
                    f"{subnet['rango']['Last_usable']}"
                )

        else:
            table = Table(
                title="Resultado del calculo de VLSM",
                title_style="bold cyan",
                header_style="bold green",
                show_lines=True
            )

            table.add_column("Subnet", justify="center")
            table.add_column("Hosts posibles", justify="right")
            table.add_column("Hosts solicitados", justify="right")
            table.add_column("Prefijo", justify="center")
            table.add_column("Mascara", justify="center")
            table.add_column("IP de red", justify="center")
            table.add_column("Broadcast", justify="center")
            table.add_column("Primera IP", justify="center")
            table.add_column("Ultima IP", justify="center")

            for subnet in result:
                table.add_row(
                    str(subnet["id"]),
                    str(subnet["hosts_posibles"]),
                    str(subnet["numero_hosts"]),
                    f"/{subnet['prefijo_red']}",
                    subnet["mascara"],
                    subnet["rango"]["First"],
                    subnet["rango"]["Last"],
                    subnet["rango"]["First_usable"],
                    subnet["rango"]["Last_usable"]
                )

            console.print(table)

    except requests.RequestException as error:
        raise click.ClickException(
            f"No fue posible comunicarse con el backend: {error}"
        )


if __name__ == "__main__":
    cli()
