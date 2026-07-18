import { useEffect, useState } from "react";
import { getTeamMembers } from "../services/api.js";

const VALUES = [
  {
    code: "01",
    title: "Compliance-first",
    text: "SHA and eTIMS requirements change fast. We ship updates the moment regulations shift, so facilities stay compliant automatically.",
  },
  {
    code: "02",
    title: "Built for local workflows",
    text: "From bed boards to M-Pesa till reconciliation, every screen is designed around how Kenyan facilities actually operate.",
  },
  {
    code: "03",
    title: "Support that answers",
    text: "Real onboarding, real training, and a support line staffed by people who understand hospital operations.",
  },
];

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTeamMembers()
      .then((data) => isMounted && setTeam(data))
      .catch(() => {})
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="page-header">
        <div className="section-container">
          <span className="eyebrow">About Medicore HMIS</span>
          <h1 className="page-header__title">
            Software built alongside the facilities that use it
          </h1>
          <p className="page-header__subtitle">
            Medicore HMIS started with one question from a Nairobi clinic
            administrator: why does compliance software make our job harder,
            not easier? Every module since has been built to answer that.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.code}>
                <span className="value-card__code">{v.code}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!isLoading && team.length > 0 && (
        <section className="section section--team">
          <div className="section-container">
            <span className="eyebrow">Our team</span>
            <h2 className="section__title">The people behind Medicore</h2>
            <div className="team-grid">
              {team.map((member) => (
                <div className="team-card" key={member.id}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="team-card__photo" />
                  ) : (
                    <div className="team-card__photo team-card__photo--placeholder">
                      {member.name?.charAt(0)}
                    </div>
                  )}
                  <h4 className="team-card__name">{member.name}</h4>
                  <p className="team-card__role">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
