import gearImg from '@/assets/gear.png';
import gearIcon from '@/assets/gear-icon.png';

export function Gear() {
  return (
    <main className="container py-4">
      <section className="page-intro">
        <h1>Sigils &amp; Relics</h1>
        <p className="intro">
          Pick your profession, role, and fight to see recommended sigils and
          relics for fractals or raids. Community suggestions will be stored in the
          database. Item details will later come from the Guild Wars 2 API.
        </p>
        <figure className="hero-frame">
          <img src={gearImg} alt="Sigils and relics on a forge altar" />
        </figure>
      </section>

      <section className="mt-5">
        <h2>Find recommendations</h2>
        <p>
          <em>Placeholder — gear lookup is not wired up yet.</em>
        </p>
        <form className="lookup-form panel" onSubmit={(event) => event.preventDefault()}>
          <div className="mb-3">
            <label className="form-label" htmlFor="profession">
              Profession
            </label>
            <select className="form-select" id="profession" disabled>
              <option>Placeholder — profession list</option>
              <option>Guardian</option>
              <option>Revenant</option>
              <option>Warrior</option>
              <option>Engineer</option>
              <option>Ranger</option>
              <option>Thief</option>
              <option>Elementalist</option>
              <option>Mesmer</option>
              <option>Necromancer</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select className="form-select" id="role" disabled>
              <option>Placeholder — role list</option>
              <option>DPS</option>
              <option>Healer</option>
              <option>Support / Quickness</option>
              <option>Support / Alacrity</option>
              <option>Tank</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="fight">
              Fight
            </label>
            <select className="form-select" id="fight" disabled>
              <option>Placeholder — fight list</option>
              <optgroup label="Fractals">
                <option>General Fractals</option>
                <option>Nightmare — Ensolyss</option>
                <option>Shattered Observatory — Arkk</option>
                <option>Sunqua Peak — Ai</option>
                <option>Silent Surf — Kanaxai</option>
                <option>Lonely Tower — Dagda</option>
                <option>Captain Mai Trin Boss</option>
                <option>Molten Boss</option>
              </optgroup>
              <optgroup label="Raids">
                <option>Spirit Vale — Vale Guardian</option>
                <option>Spirit Vale — Gorseval</option>
                <option>Spirit Vale — Sabetha</option>
                <option>Salvation Pass — Slothasor</option>
                <option>Salvation Pass — Bandit Trio</option>
                <option>Salvation Pass — Matthias</option>
                <option>Stronghold of the Faithful — Escort</option>
                <option>Stronghold of the Faithful — Keep Construct</option>
                <option>Stronghold of the Faithful — Xera</option>
                <option>Bastion of the Penitent — Cairn</option>
                <option>Bastion of the Penitent — Mursaat Overseer</option>
                <option>Bastion of the Penitent — Samarog</option>
                <option>Bastion of the Penitent — Deimos</option>
                <option>Hall of Chains — Soulless Horror</option>
                <option>Hall of Chains — River of Souls</option>
                <option>Hall of Chains — Statues of Grenth</option>
                <option>Hall of Chains — Dhuum</option>
                <option>Mythwright Gambit — Conjured Amalgamate</option>
                <option>Mythwright Gambit — Twin Largos</option>
                <option>Mythwright Gambit — Qadim</option>
                <option>The Key of Ahdashim — Gate</option>
                <option>The Key of Ahdashim — Cardinal Adina</option>
                <option>The Key of Ahdashim — Cardinal Sabir</option>
                <option>The Key of Ahdashim — Qadim the Peerless</option>
                <option>Mount Balrior — Greer</option>
                <option>Mount Balrior — Decima</option>
                <option>Mount Balrior — Ura</option>
              </optgroup>
            </select>
          </div>
          <button className="btn btn-mist" type="submit" disabled>
            Show gear (placeholder)
          </button>
        </form>
      </section>

      <section className="mt-5">
        <h2>Recommended gear (database)</h2>
        <p>
          <em>Placeholder — no real gear recommendations are loaded yet. Example shape of stored rows:</em>
        </p>
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
              <tr>
                <td>
                  <em>Placeholder slot</em>
                </td>
                <td>
                  <em>Placeholder item</em>
                </td>
                <td>
                  <em>Placeholder reason</em>
                </td>
              </tr>
              <tr>
                <td>
                  <em>Placeholder slot</em>
                </td>
                <td>
                  <em>Placeholder item</em>
                </td>
                <td>
                  <em>Placeholder reason</em>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-5">
        <h2>Item details from Guild Wars 2 API</h2>
        <p>
          <em>Placeholder — Guild Wars 2 API is not connected yet.</em> Item icons, descriptions, and stats
          will later be fetched from
          <code>https://api.guildwars2.com</code>.
        </p>
        <div className="api-panel">
          <div className="api-picture-box">
            <img src={gearIcon} alt="Sigil and relic icon" />
          </div>
          <div className="api-item">
            <div>
              <em>Placeholder — item name</em>
            </div>
            <div>
              <em>Placeholder — item stats</em>
            </div>
            <div>
              <em>Placeholder — API response</em>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
