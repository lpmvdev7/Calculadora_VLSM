from data_utils import gatherData, createData

numero_subredes=int(input("¿Cuantas subredes quieres calcular?: "))
info = gatherData(numero_subredes)
data = createData(info)
