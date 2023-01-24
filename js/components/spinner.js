export function wrapper(where = document.body) {
    const wrapper = document.createElement('div');
    wrapper.id = "spinnerWrapper";
    wrapper.classList.add("d-none")
    wrapper.innerHTML = `
    <div id="spinner" class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    where.appendChild(wrapper);
    return wrapper;
}