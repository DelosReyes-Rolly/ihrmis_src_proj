import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCaretUp, AiOutlineBell } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../../../features/reducers/popup_response";
import { API_HOST } from "../../../helpers/global/global_config";

const NotificationComponent = () => {
  const { refresh } = useSelector((state) => state.popupResponse);
  const dispatch = useDispatch();
  const [tog, setTog] = useState(false);
  const [unread, setUnread] = useState(0);
  const [itemList, setItemList] = useState();

  const unreadMsg = () => {
    let counter = 0;

    if (itemList?.length !== 0) {
      itemList?.forEach((element) => {
        if (element?.noti_read === 0) {
          console.log("Asdfasdfasdfsda");
          counter++;
        }
      });
    }
    setUnread(counter);
  };

  const getNotification = async () => {
    await axios.get(API_HOST + "get-notification").then((res) => {
      setItemList(res.data.data);
    });
  };

  const setMarkAsRead = async (mark, id) => {
    if (mark == 0) {
      console.log("asdfasdf");
      await axios.post(API_HOST + "mark-read/" + id);
      dispatch(setRefresh());
    }
  };

  useEffect(() => {
    getNotification();
  }, [refresh]);

  useEffect(() => {
    if (tog === true) {
      getNotification();
    }
  }, [tog]);

  useEffect(() => {
    unreadMsg();
  }, [itemList]);

  return (
    <React.Fragment>
      <div
        className="notification-style"
        style={{ position: "relative", width: "fit-content" }}
        tabIndex="1"
        onBlur={() => setTog(false)}
      >
        <div className="noti-container" style={{ width: "fit-content" }} onClick={() => setTog(!tog)}>
          <div className="noti-span">
            {unread !== 0 && <div className="noti-badge">{unread}</div>}
            <AiOutlineBell size="20" color="" />
          </div>
        </div>
        {tog && (
          <React.Fragment>
            <div style={{ position: "absolute", top: 28, right: 10 }}>
              <AiFillCaretUp color="white" size="15px" />
            </div>

            <div className="noti-dropboard">
              <div
                style={{
                  flexGrow: "1",
                  color: "black",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Notifications</div>

                <div style={{ width: "100%" }}>
                  {itemList?.map((item, key) => {
                    return (
                      <div key={key} onClick={() => setMarkAsRead(item.noti_read, item.noti_id)}>
                        <NotificationCard
                          title={item.noti_title}
                          msg={item.noti_message}
                          mark={item.noti_read}
                          date={item.date}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default React.memo(NotificationComponent);

const NotificationCard = ({ title = "Noti Title", msg, mark, date }) => {
  return (
    <React.Fragment>
      <div className="noti-card-style" style={mark === 1 ? { color: "grey" } : null}>
        <div className="title" style={{ fontWeight: "bold", fontSize: "13px", marginTop: "5px", marginBottom: "2px" }}>
          {title}
        </div>
        <div
          className="message"
          style={{ fontWeight: "400", fontSize: "11px", marginBottom: "5px", textAlign: "start" }}
        >
          {msg ??
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </div>
        <div style={{ fontWeight: "bold", fontSize: "10px", marginBottom: "2px" }}>{date ?? "1 sec ago."}</div>
      </div>
    </React.Fragment>
  );
};
