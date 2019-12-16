import React from "react"
import Link from "@material-ui/core/Link";
import history from "@history";
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
      rowData.name ? (
        <Link
          variant="inherit"
          underline="none"
          className={"no-underline cursor-pointer font-800"}
          color="primary"
          onClick={() => history.push(`users/${rowData.id}`)}
        >
          {rowData.name}
        </Link>
      ) : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
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
    }
  }
];

const options = {
  maxBodyHeight: "60vh",
  headerStyle: {
    ...tableStyle.headerStyle
  }
};

export const usersTableConfig = {
  title: "",
  columns,
  options
};
