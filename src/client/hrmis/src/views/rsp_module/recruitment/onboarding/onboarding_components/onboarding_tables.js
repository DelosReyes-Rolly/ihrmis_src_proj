import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useGlobalFilter, useTable } from "react-table";
import { generateColor } from "../../../../../helpers/color_generator";
import { useMapFocusHelper } from "../../../../../helpers/use_hooks/on_focus_helper";

export const OnboardingNewAppointeesTableContainer = ({}) => {
  const fakeData = [
    {
      photo:
        "https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.6435-9/92570137_122795239342588_8975076326750814208_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEIHgmkKd4L0hyft0xeP2IP6HK7gf275FzocruB_bvkXLFbMHk78JGN3t90HxLwCUwAXqlGK_YXrfGawQsIAE-z&_nc_ohc=C4uLxRotvOMAX-62mlw&_nc_ht=scontent.fmnl4-2.fna&oh=00_AT_FN1dXwWmYCwvpPs2I2braQ1DAiJxxavPbq5ThV7h9LQ&oe=62FC3BF1",
      name: "Sean Terrence Calzada",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo:
        "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-1/278384744_10216260483304885_5216491995943139373_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGc4iVYH_VHIo1Y06qxOTiLXpj3lzeCBKtemPeXN4IEq8yGUxTDV6OI9EcqVAQSovedH60Nau38HFybFRYwFJuJ&_nc_ohc=xkI6eEX4sjQAX9ym-wi&_nc_ht=scontent.fmnl4-2.fna&oh=00_AT-c2LJfmfIHzoi_H9sh0JTEr9L9LeXv5VM87WjISJlgYg&oe=62DBA16A",
      name: "Legee Valmoria",
      position: "Officer",
      office: "ITD-CO",
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "NEW APPOINTEES",
        columns: [
          {
            Header: "",
            accessor: "photo",
            Cell: ({ cell }) => {
              return (
                <React.Fragment>
                  <div className="image-zoom-effect-user">
                    <AppointeesImageDisplay
                      photo={cell.row.values.photo}
                      name={cell.row.values.name}
                    />
                  </div>
                </React.Fragment>
              );
            },
          },
          {
            Header: "",
            accessor: "name",
            Cell: ({ cell }) => {
              return (
                <React.Fragment>
                  <div style={{}}>
                    <div style={{ fontWeight: "bold" }}>
                      {cell.row.values.name}
                    </div>
                    <div style={{ color: "#00000080", fontSize: "small" }}>
                      {cell.row.values.position}, {cell.row.values.office}
                    </div>
                  </div>
                </React.Fragment>
              );
            },
          },
          {
            Header: "",
            accessor: "position",
          },
          {
            Header: "",
            accessor: "office",
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => fakeData, [fakeData]);

  return (
    <React.Fragment>
      <AppointeesTable data={data} columns={columns} />
    </React.Fragment>
  );
};

const AppointeesTable = ({ data, columns }) => {
  const { searchField } = useSelector((state) => state.onboarding);

  const initialState = { hiddenColumns: ["position", "office"] };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter
  );

  const [refTopic, focus, blur] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  useEffect(() => setGlobalFilter(searchField), [searchField]);

  return (
    <React.Fragment>
      <table
        cellSpacing="0"
        cellPadding="0"
        {...getTableProps()}
        style={{ width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              style={{ textAlign: "left" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  style={{ padding: "0px 0px", color: "#004e87" }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i, arr) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                ref={(el) => (refTopic.current[i] = el)}
                className="onboarding-tr-hover"
                {...row.getRowProps()}
                onClick={() => focus(i, arr.length)}
                onBlur={() => blur(arr.length)}
                tabIndex={i}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{
                        padding:
                          cell.column.id === "name"
                            ? "5px 0px 5px 5px"
                            : "5px 5px",
                        width: cell.column.id === "photo" ? "30px" : null,
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export const OnboardingNewScheduleTableContainer = ({}) => {
  const stringigy = JSON.stringify([
    {
      photo: null,
      name: "Tezada",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Haist well job",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Xyliegh Calzada",
      position: "Officer",
      office: "ITD-CO",
    },
  ]);

  const stringigy2 = JSON.stringify([
    {
      photo:
        "https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.6435-9/92570137_122795239342588_8975076326750814208_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEIHgmkKd4L0hyft0xeP2IP6HK7gf275FzocruB_bvkXLFbMHk78JGN3t90HxLwCUwAXqlGK_YXrfGawQsIAE-z&_nc_ohc=C4uLxRotvOMAX-62mlw&_nc_ht=scontent.fmnl4-2.fna&oh=00_AT_FN1dXwWmYCwvpPs2I2braQ1DAiJxxavPbq5ThV7h9LQ&oe=62FC3BF1",
      name: "Sean Terrence Calzada",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Leegeee",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo:
        "https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.6435-9/176334729_4698490976834737_6071377516544915750_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFs6X329Ipn4Q4aA9JiJu8Ldw_--MyJ5dd3D_74zInl16dgRbRZEU9nj7yYc-e9jPMbyiuv677FrPrDNiZLBAP_&_nc_ohc=IJOZi1ekyzwAX963lUw&_nc_ht=scontent.fmnl4-4.fna&oh=00_AT8yjmLGM-NGm4tkD0ipCs0DNlw-K18FTxqu5C-2UsyBZQ&oe=62FC64FD",
      name: "Dampil",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Migs",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Chinnette",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Rose",
      position: "Officer",
      office: "ITD-CO",
    },
    {
      photo: null,
      name: "Aren",
      position: "Officer",
      office: "ITD-CO",
    },
  ]);

  const fakeData = [
    {
      appointees: stringigy,
      schedule: "12 Dec 2014, 8:40 AM",
    },
    {
      appointees: stringigy2,
      schedule: "12 Aug 2014, 12:40 PM",
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "SCHEDULE",
        columns: [
          {
            Header: "",
            accessor: "appointees",
            Cell: ({ cell }) => {
              const objectOfContent = JSON.parse(cell.row.values.appointees);
              return (
                <ScheduleAppointeesImages objectOfContent={objectOfContent} />
              );
            },
          },
          {
            Header: "",
            accessor: "schedule",
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => fakeData, [fakeData]);
  return (
    <React.Fragment>
      <ScheduleTable data={data} columns={columns} />
    </React.Fragment>
  );
};

const ScheduleTable = ({ data, columns }) => {
  const initialState = { hiddenColumns: ["position", "office", "photo"] };
  const { searchField } = useSelector((state) => state.onboarding);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      initialState,
      columns,
      data,
    },
    useGlobalFilter
  );

  useEffect(() => setGlobalFilter(searchField), [searchField]);

  const [refSchedule, focus, blur] = useMapFocusHelper(
    "onboarding-tr-hover",
    "onboarding-tr-hover-focus"
  );

  return (
    <React.Fragment>
      <table
        cellSpacing="0"
        cellPadding="0"
        {...getTableProps()}
        style={{ width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              style={{ textAlign: "left" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  style={{ padding: "0px 0px", color: "#004e87" }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i, arr) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                ref={(el) => (refSchedule.current[i] = el)}
                className="onboarding-tr-hover"
                {...row.getRowProps()}
                onClick={() => focus(i, arr.length)}
                onBlur={() => blur(arr.length)}
                tabIndex={i}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{
                        padding:
                          cell.column.id === "appointees"
                            ? "8px 5px"
                            : "8px 0px",
                        fontSize:
                          cell.column.id === "schedule" ? "small" : null,
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const ScheduleAppointeesImages = ({ objectOfContent }) => {
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        {objectOfContent?.map((item, key, arr) => {
          if (key === 5) {
            return (
              <div
                key={key}
                style={{
                  borderRadius: "40px",
                  display: "flex",
                  marginLeft: key > 0 ? "-8px" : null,
                  backgroundColor: "rgba(96,96,96,0.2)",
                  zIndex: arr.length - key,
                  width: "30px",
                  fontSize: "x-small",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <strong style={{ color: "rgba(0,0,0,0.7)" }}>
                  +{arr.length - 5}
                </strong>
              </div>
            );
          }
          if (key > 5) return null;
          return (
            <div
              className="image-zoom-effect-user"
              key={key}
              style={{
                borderRadius: "40px",
                display: "flex",
                marginLeft: key > 0 ? "-10px" : null,
                backgroundColor: "white",
                color: "rgba(0,0,0,0.7)",
                zIndex: arr.length - key,
                width: "30px",
                height: "30px",
              }}
            >
              <AppointeesImageDisplay photo={item?.photo} name={item?.name} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

const AppointeesImageDisplay = ({ photo = null, name = null }) => {
  const rng = generateColor(name);
  const firstLetterName = name[0].toUpperCase();
  if (photo === null) {
    return (
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "30px",
          backgroundColor: `${rng}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        {firstLetterName}
      </div>
    );
  }
  return (
    <div style={{ width: "30px", height: "30px", borderRadius: "30px" }}>
      <img
        style={{
          objectFit: "cover",
          width: "30px",
          height: "30px",
          borderRadius: "30px",
        }}
        src={photo}
        alt="sadfaxcfsddsf"
      />
    </div>
  );
};
