import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  const getStats = async () => {
    try {
      const res = await axios.get("users/stats", {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDlmMjUxMGU2YzZhMjVkZDVkODJlNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTAzMzU2NywiZXhwIjoxNjQ5NDY1NTY3fQ.3XnVMrlzTYdXdGmzeZh7KFgitIt5IkDuc1uwCXFriyo",
        },
      });
      const statsList = res.data.sort(function (a, b) {
        return a._id - b._id;
      });
      statsList.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { name: months[item._id - 1], "New User": item.total },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
  }, [months]);

console.log(userStats)  

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="New User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
