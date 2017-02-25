export default function reducer(state = {
  docName: 'TestName',
  docDescription: '',
  docType: '',
  parentID: null,
  filePath: '',
  docContent: '',
  showMerge: false,
  error: null
}, action) {

  switch(action.type) {

    case "EDIT_DOCNAME": {
      return {
        ...state,
        docName: action.payload
      }
    }
    case "EDIT_DOCDESCRIPTION": {
      return {
        ...state,
        docDescription: action.payload
      }
    }
    case "EDIT_DOCTYPE": {
      return {
        ...state,
        docType: action.payload
      }
    }
    case "EDIT_DOCCONTENT": {
      return {
        ...state,
        docContent: action.payload
      }
    }
  }

  return state;
}