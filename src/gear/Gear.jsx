import { useEffect, useState } from 'react';
import gearImg from '@/assets/gear.png';
import gearIcon from '@/assets/gear-icon.png';
import { CHEAT_SHEET_INTRO, CHEAT_SHEET_ROWS } from '@/data/cheatSheet';
import {
  FRACTAL_GEAR,
  PROFESSIONS,
  ROLES,
  getGearRecommendation,
} from '@/data/gearRecommendations';
import { getDailyFractals, getItemDetails } from '@/services/gw2Api';

const FIGHT_OPTIONS = {
  Fractals: [
    'General Fractals',
    ...Object.keys(FRACTAL_GEAR).filter((k) => k !== 'General Fractals'),
  ],
  Raids: [
    'Spirit Vale — Vale Guardian',
    'Spirit Vale — Gorseval',
    'Spirit Vale — Sabetha',
    'Salvation Pass — Slothasor',
    'Salvation Pass — Bandit Trio',
    'Salvation Pass — Matthias',
    'Stronghold of the Faithful — Escort',
    'Stronghold of the Faithful — Keep Construct',
    'Stronghold of the Faithful — Xera',
    'Bastion of the Penitent — Cairn',
    'Bastion of the Penitent — Mursaat Overseer',
    'Bastion of the Penitent — Samarog',
    'Bastion of the Penitent — Deimos',
    'Hall of Chains — Soulless Horror',
    'Hall of Chains — River of Souls',
    'Hall of Chains — Statues of Grenth',
    'Hall of Chains — Dhuum',
    'Mythwright Gambit — Conjured Amalgamate',
    'Mythwright Gambit — Twin Largos',
    'Mythwright Gambit — Qadim',
    'The Key of Ahdashim — Gate',
    'The Key of Ahdashim — Cardinal Adina',
    'The Key of Ahdashim — Cardinal Sabir',
    'The Key of Ahdashim — Qadim the Peerless',
    'Mount Balrior — Greer',
    'Mount Balrior — Decima',
    'Mount Balrior — Ura',
  ],
};

/** Placeholder for a GW2 item icon — replaced by API icon URLs later. */
function ApiIconPlaceholder({ name }) {
  return (
    <span
      className="api-icon-placeholder"
      title={`${name} — icon from Guild Wars 2 API (coming later)`}
      aria-label={`Icon placeholder for ${name}. Will load from Guild Wars 2 API later.`}
    >
      <span className="api-icon-placeholder-label" aria-hidden="true">
        API
      </span>
    </span>
  );
}

export function Gear() {
  const [profession, setProfession] = useState(PROFESSIONS[0]);
  const [role, setRole] = useState(ROLES[0]);
  const [fight, setFight] = useState('General Fractals');
  const [recommendation, setRecommendation] = useState(null);
  const [apiItem, setApiItem] = useState(null);
  const [dailies, setDailies] = useState(null);

  useEffect(() => {
    // Mock GW2 daily fractals payload on mount
    setDailies(getDailyFractals());
  }, []);

  function handleLookup(event) {
    event.preventDefault();
    const result = getGearRecommendation(fight, role);
    setRecommendation({ ...result, profession });

    const primarySigil = result.sigils[0];
    setApiItem(getItemDetails(primarySigil));
  }

  return (
    <main className="container py-4">
      <section className="page-intro">
        <h1>Sigils &amp; Relics</h1>
        <p className="intro">
          Fractal sigil and potion recommendations for power builds, based on the{' '}
          <a
            href="https://archive.discretize.eu/guides/cheat-sheet/"
            target="_blank"
            rel="noreferrer"
          >
            Discretize cheat sheet
          </a>
          . Scroll down to filter by profession, role, and fight.
        </p>
        <figure className="hero-frame">
          <img src={gearImg} alt="Sigils and relics on a forge altar" />
        </figure>
      </section>

      {dailies && (
        <section className="mt-4">
          <p className="daily-banner">
            <strong>Today&apos;s fractals (mocked API):</strong>{' '}
            {dailies.fractals.join(', ')} — {dailies.date}
          </p>
        </section>
      )}

      <section className="mt-5">
        <h2>General Suggestions</h2>
        <p>{CHEAT_SHEET_INTRO}</p>
        <p className="api-icon-note">
          Item icons are placeholders for now — they will load from{' '}
          <code>https://api.guildwars2.com/v2/items</code> in a later deliverable.
        </p>
        <div className="table-responsive mt-3">
          <table className="table table-hover mist-table">
            <thead>
              <tr>
                <th>Fractal</th>
                <th>Day/Night</th>
                <th>Sigil &amp; Potion</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {CHEAT_SHEET_ROWS.map((row) => (
                <tr key={row.fractal}>
                  <td>{row.fractal}</td>
                  <td>{row.dayNight}</td>
                  <td>
                    <ul className="item-icon-list">
                      {row.items.map((itemName) => (
                        <li key={itemName} className="item-icon-row">
                          <ApiIconPlaceholder name={itemName} />
                          <span>{itemName}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-5">
        <h2>Find Specific Recommendations</h2>
        <p>
          Pick your profession, role, and fight for a tailored slot breakdown.
          Item details below use a mocked Guild Wars 2 API response shape.
        </p>
        <form className="lookup-form panel" onSubmit={handleLookup}>
          <div className="mb-3">
            <label className="form-label" htmlFor="profession">
              Profession
            </label>
            <select
              className="form-select"
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              {PROFESSIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="fight">
              Fight
            </label>
            <select
              className="form-select"
              id="fight"
              value={fight}
              onChange={(e) => setFight(e.target.value)}
            >
              {Object.entries(FIGHT_OPTIONS).map(([group, options]) => (
                <optgroup key={group} label={group}>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <button className="btn btn-mist" type="submit">
            Show gear
          </button>
        </form>

        {!recommendation && (
          <p className="mt-3">
            <em>Choose a fight above and click Show gear.</em>
          </p>
        )}
        {recommendation && (
          <div className="mt-4">
            <p>
              {recommendation.profession} · {recommendation.role} · {recommendation.fight}{' '}
              ({recommendation.dayNight})
            </p>
            <p className="gear-notes">{recommendation.notes}</p>
            <div className="table-responsive">
              <table className="table table-hover mist-table">
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Item</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendation.slots.map((row) => (
                    <tr key={row.slot}>
                      <td>{row.slot}</td>
                      <td>{row.item}</td>
                      <td>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <section className="mt-5">
        <h2>Item details from Guild Wars 2 API</h2>
        <p>
          Hard-coded response shaped like{' '}
          <code>https://api.guildwars2.com/v2/items</code>. Run a lookup above to
          load the primary sigil.
        </p>
        <div className="api-panel">
          <div className="api-picture-box">
            <img
              src={apiItem?.item?.icon || gearIcon}
              alt={apiItem?.item?.name || 'Sigil and relic icon'}
              onError={(e) => {
                e.currentTarget.src = gearIcon;
              }}
            />
          </div>
          <div className="api-item">
            {!apiItem && (
              <div>
                <em>Run Show gear to load a mocked API item</em>
              </div>
            )}
            {apiItem && (
              <>
                <div>
                  <strong>{apiItem.item.name}</strong> ({apiItem.item.rarity})
                </div>
                <div>
                  Level {apiItem.item.level} · {apiItem.item.type} · id {apiItem.item.id}
                </div>
                <div>{apiItem.item.description}</div>
                <div className="api-source">{apiItem.source}</div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
