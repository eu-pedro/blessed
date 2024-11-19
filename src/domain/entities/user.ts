interface Props {
  id: string
  name: string
  email: string
}

export class User {
  constructor(private readonly props: Props) {}

  public get id() {
    return this.props.id
  }

  public get name() {
    return this.props.name
  }

  public get email() {
    return this.props.email
  }
}