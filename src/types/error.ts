
export const useErrorMessage = (type: string ) => {
  function createErrorMessage(response: Response): string | null {
    if (response.ok) {
      return null;
    }

    if (response.status === 403) {
      return `Could not remove the ${type} due to lacking permissions.`
    }

    if (response.status === 404) {
      return `The  ${type}  you tried to remove does not exist.`;
    }

    if (response.status >= 400 && response.status < 500) {
      return `Could not remove the  ${type}  due to an error.`
    }

    if (response.status >= 500) {
      return `Could not remove the  ${type}  due to a server error.`;
    }

    return null;
  }

  return {createErrorMessage};
}

