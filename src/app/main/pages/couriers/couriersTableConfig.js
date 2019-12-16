import React from "react"
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import history from "@history";
import { unixtimestampToDate } from "app/utils/DateUtil"
import defaultTheme from 'app/config/themes/defaultTheme';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import ChipStatus from "app/main/components/chipStatus/ChipStatus";

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
          className={"cursor-pointer font-800"}
          color="primary"
          onClick={() => history.push(`couriers/${rowData.id}`)}
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
    title: "Status",
    field: "active",
    render: rowData => (
      <ChipStatus status={rowData.active ? 'ACTIVE' : 'INACTIVE'} />
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    }
  },
  {
    title: "Localização",
    render: rowData => (
      rowData.location ?
        <Button
          variant={"contained"}
          color={"primary"}
          size={"small"}
          className={"p-4 h-28"}>
          <a
            href={`https://www.google.com/maps?q=${rowData.location.geopoint._lat},${rowData.location.geopoint._long}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-white" />
          </a>
        </Button>
        : " - "
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
  },
];

const options = {
  maxBodyHeight: "60vh",
  headerStyle: {
    ...tableStyle.headerStyle
  }
};

export const couriersTableConfig = {
  title: "",
  columns,
  options
};