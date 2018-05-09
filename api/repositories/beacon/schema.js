export default [`
  enum BEACON_STATUSES {
    AVAILABLE
    INUSED
    CLOSED
  }

  type Beacon {
    _id: ID
    token: String
    name: String
    status: BEACON_STATUSES
  }
`]
