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
    title: "Distância",
    field: "distance",
    render: rowData => (
      rowData.distance ? rowData.distance : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Duração",
    field: "duration",
    render: rowData => (
      rowData.duration ? rowData.duration : " - "
    ),
    cellStyle: {
      ...tableStyle.cellStyle
    },
    headerStyle: {
      ...tableStyle.headerStyle
    }
  },
  {
    title: "Valor",
    field: "price",
    render: rowData => (
      rowData.price ? NumberUtil.getDoubleAsCurrency(rowData.price) : " - "
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
  }
];

const options = {
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  maxBodyHeight: "50vh"
};

export const paymentsTableConfig = {
  title: "",
  columns,
  options
};
