import { unixtimestampToDate } from "app/utils/DateUtil"
import defaultTheme from 'app/config/themes/defaultTheme';

const tableStyle = {
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
    title: "Nome",
    field: "name",
    render: rowData => (
      rowData.name ? rowData.name : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Celular",
    field: "mobilePhone",
    render: rowData => (
      rowData.mobilePhone ? rowData.mobilePhone : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "E-mail",
    field: "email",
    render: rowData => (
      rowData.email ? rowData.email : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Criado Em",
    field: "createdDate",
    render: rowData => (
      rowData.createdDate ?
        unixtimestampToDate(rowData.createdDate.seconds * 1000)
        : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Localização",
    field: "location",
    render: rowData => (
      rowData.location ?
        `${rowData.location._lat}, ${rowData.location._long}`
        : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  }
];

const options = {
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  maxBodyHeight: "55vh"
};

export const usersTableConfig = {
  title: "",
  columns,
  options
};
