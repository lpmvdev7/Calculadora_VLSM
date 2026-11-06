import {
    Document,
    Page,
    StyleSheet,
    Text,
    View
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    document: {
        padding: 24
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    logo: {
        color: "#4B64CA",
        fontSize: 20,
		fontWeight:800
    },

    informe: {
        fontSize: 8,
        color: "#5C6576"
    },

    headerText: {
        color: "#5C6576"
    },

    networkInfoContainer: {
        flexDirection: "column",
        gap: 5,
        marginTop: 20,
		// fontWeight:800
    },

    networkType: {
        fontSize: 25,
        color: "#5C6576",
		fontWeight:800
    },

    networkClass: {
        color: "#4B64CA",
        fontWeight:800
    },

    description: {
        fontSize: 10,
        color: "#5C6576"
    },

    networkNumbersContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12
    },

    networkNumbersCard: {
        flexDirection: "column",
        padding: 20,
    },

    networkNumberCardN: {
        color: "#4B64CA",
        fontSize: 28,
		fontWeight:800
    },

    networkNumberCardT: {
        color: "#848484",
        fontSize: 10
    },

    vlsmTablePdfHeader: {
        flexDirection: "row",
        backgroundColor: "#4B64CA",
        padding: 8,
        marginTop: 12,
		fontWeight:800
    },

    vlsmTablePdfHeaderDiv: {
        fontSize: 7,
        color: "white",
        flex: 1,
		fontWeight:800
    },

    vlsmTablePdfSection: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between",
		fontWeight:800
    },

    vlsmTablePdfSectionAlternative: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#E8E8E8",
		fontWeight:800
    },

    vlsmTablePdfSectionDiv: {
        fontSize: 7,
        color: "#848484",
        flex: 1
    }
});

const NetworkHeader = () => (
    <View style={styles.header}>
        <Text style={styles.logo}>VLSM</Text>
        <Text style={styles.informe}>
            INFORME DE DIRECCIONAMIENTO
        </Text>
    </View>
);

const NetworkInfo = () => (
    <View style={styles.networkInfoContainer}>
        <Text style={styles.networkType}>
            RED PRIVADA{" "}
            <Text style={styles.networkClass}>CLASE C</Text>
        </Text>

        <Text style={styles.description}>
            Tabla con información sobre el direccionamiento
            de red para las subredes indicadas por el usuario.
        </Text>
    </View>
);

const NetworkCards = ({data}) => (
    <View style={styles.networkNumbersContainer}>
        <View style={styles.networkNumbersCard}>
            <Text style={styles.networkNumberCardN}>545</Text>
            <Text style={styles.networkNumberCardT}>
                HOSTS USADOS
            </Text>
        </View>

        <View style={styles.networkNumbersCard}>
            <Text style={styles.networkNumberCardN}>1022</Text>
            <Text style={styles.networkNumberCardT}>
                HOSTS DISPONIBLES
            </Text>
        </View>

        <View style={styles.networkNumbersCard}>
            <Text style={styles.networkNumberCardN}>53%</Text>
            <Text style={styles.networkNumberCardT}>
                UTILIZACIÓN
            </Text>
        </View>
    </View>
);

const VlsmPdfTable = ({data}) => {
    return (
        <View>
            <View style={styles.vlsmTablePdfHeader}>
                <Text style={styles.vlsmTablePdfHeaderDiv}>N subred</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Hosts</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>N Hosts</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Red</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Broadcast</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Primera IP</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Última IP</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Prefijo</Text>
                <Text style={styles.vlsmTablePdfHeaderDiv}>Máscara</Text>
            </View>

            {data.map((row, index) => (
                <View
                    key={row.id}
                    style={
                        index % 2 === 0
                            ? styles.vlsmTablePdfSection
                            : styles.vlsmTablePdfSectionAlternative
                    }
                >
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.id}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.hosts_posibles}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.numero_hosts}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.rango.First}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.rango.Last}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.rango.First_usable}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.rango.Last_usable}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.prefijo_red}</Text>
                    <Text style={styles.vlsmTablePdfSectionDiv}>{row.mascara}</Text>
                </View>
            ))}
        </View>
    );
};

export default function VlsmPdf({data}) {
    return (
        <Document title="VLSM Reporte">
            <Page size="A4" orientation="portrait" style={styles.document}>
                <NetworkHeader />
                <NetworkInfo />
                <NetworkCards />
                <VlsmPdfTable data={data}/>
            </Page>
        </Document>
    );
}
