export function selectCompany(company) {
  return {
    type: 'COMPANY_SELECTED',
    payload: company
  };
}
