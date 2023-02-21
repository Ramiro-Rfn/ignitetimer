import { HistoryContainer, HistoryList, Status } from './styles'

export default function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {['Concluído', 'Em andamento', 'Interrompido'].map((value) => {
              return (
                <tr key={value}>
                  <td>Estudar testes no react</td>
                  <td>2 minutos</td>
                  <td>Há 2 meses</td>
                  <td>
                    <Status statusColor="green">{value}</Status>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
