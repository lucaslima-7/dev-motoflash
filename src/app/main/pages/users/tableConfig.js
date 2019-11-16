import { unixtimestampToDate } from "app/utils/DateUtil"
import defaultTheme from 'app/config/themes/defaultTheme';

const usersTableStyle = {
  cellStyle: { fontSize: 14, paddingTop: 8, paddingBottom: 8 },
  headerStyle: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 900,
    textTransform: "uppercase",
    color: defaultTheme.palette.primary.main,
  }
};

const columns = [
  {
    title: "ID",
    field: "id",
    cellStyle: {
      ...usersTableStyle.cellStyle
    },
    headerStyle: {
      ...usersTableStyle.headerStyle
    }
  },
  {
    title: "Name",
    field: "fullName",
    render: rowData => (rowData.firstName + " " + rowData.lastName),
    cellStyle: {
      ...usersTableStyle.cellStyle
    },
    headerStyle: {
      ...usersTableStyle.headerStyle
    }
  },
  {
    title: "Mobile Phone",
    field: "mobilePhone",
    render: rowData => ("(" + rowData.ddd + ") " + rowData.mobilePhone),
    cellStyle: {
      ...usersTableStyle.cellStyle
    },
    headerStyle: {
      ...usersTableStyle.headerStyle
    }
  },
  {
    title: "E-mail",
    field: "email",
    cellStyle: {
      ...usersTableStyle.cellStyle
    },
    headerStyle: {
      ...usersTableStyle.headerStyle
    }
  },
  {
    title: "Created Date",
    field: "createdDate",
    render: rowData => unixtimestampToDate(rowData.createdDate * 1000).substring(0, 10),
    cellStyle: {
      ...usersTableStyle.cellStyle
    },
    headerStyle: {
      ...usersTableStyle.headerStyle
    }
  }
];

const options = {
  pageSize: 20,
  pageSizeOptions: [20, 50, 100, 200, 1000],
  maxBodyHeight: "50vh"
};

export const tableConfig = {
  title: "",
  columns,
  options
};
