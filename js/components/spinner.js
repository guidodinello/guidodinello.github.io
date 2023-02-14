export function wrapper(parent = document.body) {
    const wrapper = document.createElement('div');
    wrapper.id = "spinnerWrapper";
    wrapper.innerHTML = `
    <div id="spinner" class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    parent.appendChild(wrapper);
    return wrapper;
}