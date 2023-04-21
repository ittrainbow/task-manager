import moment from 'moment/moment'

export const emptyTask = (uid) => {
  return {
    creator: uid,
    lastmodified: new Date().getTime(),
    comments: [],
    name: '',
    description: '',
    deadline: new Date().getTime(),
    status: 'New',
    appointed: uid
  }
}

export const taskListNameHelper = (name) => {
  return name.length > 40 ? name.substring(0, 37) + '...' : name
}

export const taskListDescriptionHelper = (description) => {
  return description.length > 80 ? description.substring(0, 77) + '...' : description
}

export const getFromUserlist = ({ userlist, uid }) => {
  return userlist.filter((el) => el.uid === uid)[0].name
}

export const convertMilliesToISO = (value) => {
  const ISOTime = moment(value).format().substring(0, 16)
  const readableTime = ISOTime.split('T').join(' ')
  return { ISOTime, readableTime }
}
