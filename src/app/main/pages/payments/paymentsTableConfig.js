import React from "react"
import Link from "@material-ui/core/Link"
import history from "@history";
import { unixtimestampToDate } from "app/utils/DateUtil";
import NumberUtil from "app/utils/NumberUtil";
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
    title: "Valor",
    render: rowData => (
      rowData.amount ? NumberUtil.getDoubleAsCurrency(rowData.amount) : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    }
  },
  {
    title: "Pago - Motoboy",
    render: rowData => (
      rowData.courierAmount ? NumberUtil.getDoubleAsCurrency(rowData.courierAmount) : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    }
  },
  {
    title: "ID Motoboy",
    render: rowData => (
      <>
        {rowData.courierId ? (
          <Link
            variant="inherit"
            onClick={() => history.push('/couriers/' + rowData.courierId)}
            className={"cursor-pointer font-800"}
            color="primary">
            {rowData.courierId}
          </Link>
        ) : (
            " - "
          )}
      </>
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    }
  },
  {
    title: "ID Viagem",
    render: rowData => (
      <>
        {rowData.workOrderId ? (
          <Link
            variant="inherit"
            onClick={() => history.push('/workOrder/' + rowData.workOrderId)}
            className={"cursor-pointer font-800"}
            color="primary">
            {rowData.workOrderId}
          </Link>
        ) : (
            " - "
          )}
      </>
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

export const paymentsTableConfig = {
  title: "",
  columns,
  options
};
