import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const Stats = ({ stats = [] }) => {
  const defaultStats = [
    { icon: "fas fa-user-md", value: 25, label: "Doctors" },
    { icon: "far fa-hospital", value: 15, label: "Departments" },
    { icon: "fas fa-flask", value: 8, label: "Research Labs" },
    { icon: "fas fa-award", value: 150, label: "Awards" }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {displayStats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className={`${stat.icon} flex-shrink-0`}></i>
                <div>
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={0.5}
                    className="purecounter"
                  />
                  <p>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;