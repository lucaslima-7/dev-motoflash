import React from "react"
import Button from "@material-ui/core/Button";
import { unixtimestampToDate } from "app/utils/DateUtil"
import defaultTheme from 'app/config/themes/defaultTheme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

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
