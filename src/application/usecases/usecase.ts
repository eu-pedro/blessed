export interface UseCase<RequestUseCaseProps, ResponseUseCaseProps> {
  execute(props: RequestUseCaseProps): Promise<ResponseUseCaseProps>
}