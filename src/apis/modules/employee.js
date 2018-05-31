const pickEmployee = (res) => {
  const searchData = [];
  if (res.success) {
    const data = res.data.sort((a, b) => a.u_name.localeCompare(b.u_name));
    data.forEach((i) => {
      searchData.push({
        label: i['u_name'],
        value: {
          id: i.id,
          name: i.u_name
        }
      });
    });
  }
  return searchData;
};

export default {
  search: {
    name: 'search',
    url: '/api/employee/search/',
    method: 'get',
    type: 'json',
    serialize: (q) => {
      return q ? { text: q, all: 1 } : false;
    },
    deserialize: pickEmployee
  },
  baseSearch: {
    name: 'baseSearch',
    url: '/api/employee/search/',
    method: 'get',
    type: 'json',
    deserialize: pickEmployee
  },
  searchSupervisor: {
    name: 'searchSupervisor',
    url: '/api/employee/search/',
    method: 'get',
    type: 'json',
    serialize: (q) => {
      return q ? { text: q } : false;
    },
    deserialize: pickEmployee
  },
  department_search: {
    name: 'department_search',
    url: '/api/employee/department_search/',
    method: 'get',
    type: 'json',
    serialize: (q) => {
      return q ? { text: q.toLowerCase() } : false;
    },
    deserialize: (res) => {
      if (res.success) {
        const data = res.data;
        const options = [];
        for (const i in data) {
          if (data.hasOwnProperty(i)) {
            const item = data[i];
            options.push({
              label: item.name,
              value: {
                id: item.id,
                name: item.name
              }
            });
          }
        }
        return options;
      }
    }
  },
  googleGroupSearch: {
    name: 'googleGroupSearch',
    url: '/api/employee/google_group_search',
    method: 'get',
    type: 'json',
    serialize: (q) => {
      return q ? { text: q.toLowerCase() } : false;
    },
    deserialize: (res) => {
      return res.success ? res.data && res.data.map(item => ({
        value: item.email,
        label: item.email
      })) : null;
    }
  }
};
