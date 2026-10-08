import fractalsImg from '@/assets/fractals.png';

export function Fractals() {
  return (
    <main className="container py-4">
      <section className="page-intro">
        <h1>Fractal Skips</h1>
        <p className="intro">
          Browse and contribute crowd-sourced skip routes for Mistlock Sanctuary
          fractals. Tips will load from the database and update live as players
          submit new strategies.
        </p>
        <figure className="hero-frame">
          <img src={fractalsImg} alt="Crystalline fractal platforms over mist" />
        </figure>
      </section>

      <section className="mt-5">
        <h2>Live updates</h2>
        <p>
          <em>Placeholder — WebSocket live feed is not connected yet. Example shape of realtime messages:</em>
        </p>
        <ul className="notification list-group">
          <li className="list-group-item">
            <em>Placeholder user</em> submitted a skip for <em>Placeholder fractal</em>
          </li>
          <li className="list-group-item">
            <em>Placeholder user</em> upvoted <em>Placeholder skip title</em>
          </li>
        </ul>
      </section>

      <section className="mt-5">
        <h2>Submit a skip</h2>
        <p>
          <em>Placeholder — submissions are not saved yet.</em>
        </p>
        <form className="lookup-form panel" onSubmit={(event) => event.preventDefault()}>
          <div className="mb-3">
            <label className="form-label" htmlFor="fractal">
              Fractal
            </label>
            <select className="form-select" id="fractal" disabled>
              <option>Placeholder — fractal list</option>
              <option>Volcanic</option>
              <option>Uncategorized</option>
              <option>Snowblind</option>
              <option>Urban Battleground</option>
              <option>Swampland</option>
              <option>Cliffside</option>
              <option>Aquatic Ruins</option>
              <option>Underground Facility</option>
              <option>Molten Furnace</option>
              <option>Molten Boss</option>
              <option>Aetherblade</option>
              <option>Thaumanova Reactor</option>
              <option>Solid Ocean</option>
              <option>Captain Mai Trin Boss</option>
              <option>Chaos Isles</option>
              <option>Nightmare</option>
              <option>Shattered Observatory</option>
              <option>Twilight Oasis</option>
              <option>Deepstone</option>
              <option>Sunqua Peak</option>
              <option>Silent Surf</option>
              <option>Lonely Tower</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="skip-title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="skip-title"
              placeholder="Placeholder — skip title"
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="skip-notes">
              Notes
            </label>
            <textarea
              className="form-control"
              id="skip-notes"
              rows={4}
              placeholder="Placeholder — route notes"
              disabled
            ></textarea>
          </div>
          <button className="btn btn-mist" type="submit" disabled>
            Submit skip (placeholder)
          </button>
        </form>
      </section>

      <section className="mt-5">
        <h2>Skips from the database</h2>
        <p>
          <em>Placeholder — no real skip data is loaded yet. Example shape of stored rows:</em>
        </p>
        <div className="table-responsive">
          <table className="table table-hover mist-table">
            <thead>
              <tr>
                <th>Fractal</th>
                <th>Skip</th>
                <th>Submitted by</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <em>Placeholder fractal</em>
                </td>
                <td>
                  <em>Placeholder skip title</em>
                </td>
                <td>
                  <em>Placeholder user</em>
                </td>
                <td>
                  <em>—</em>
                </td>
              </tr>
              <tr>
                <td>
                  <em>Placeholder fractal</em>
                </td>
                <td>
                  <em>Placeholder skip notes</em>
                </td>
                <td>
                  <em>Placeholder user</em>
                </td>
                <td>
                  <em>—</em>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
