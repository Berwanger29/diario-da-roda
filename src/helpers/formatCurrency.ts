export function formatCurrency(valueInCents: number): string {
    const valueInReais = valueInCents / 100;
    return valueInReais.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}
