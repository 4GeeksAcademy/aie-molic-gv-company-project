import {
  filterProductsByWarehouse, filterProductsByCategory, filterLowStockProducts,
  sortProductsByStock, sortCarriersByReliability, findProductBySKU, findShipmentById,
  binarySearchProductByWeight, countProductsByCategory, groupShipmentsByStatus,
  findTopCarriers, calculateTotalInventoryValue, calculateAverageShipmentDistance,
  calculateShippingCost, scoreCarrierForShipment, selectBestCarrier,
  validateProduct, validateShipment, validateCarrier,
} from '../../../../packages/trackflow-utils/src/index.ts';
import { cloneFixtures } from './data.js';
import trackflowLogo from '../../../website/assets/logos/trackflow-horizontal-light.svg';
import './styles.js';

let data = cloneFixtures();
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
$('#brand-logo').src = trackflowLogo;
const sectionIds = new Set(['overview', 'inventory', 'shipments', 'carriers', 'validations', 'reports']);
const money = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const number = (value, digits = 0) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const statusClass = (status) => ({ Pending: 'badge-amber', Assigned: 'badge-blue', 'In transit': 'badge-cyan', Delivered: 'badge-green', Failed: 'badge-red' })[status] ?? 'badge-blue';
const statusBadge = (status) => `<span class="badge ${statusClass(status)}">${esc(status)}</span>`;
const card = (label, value, note, icon) => `<article class="panel metric-card"><div class="flex items-start justify-between gap-3"><div><p class="text-xs font-semibold text-[#526578]">${label}</p><p class="tabular mt-2 font-display text-2xl font-extrabold tracking-tight text-[#03142E]">${value}</p><p class="mt-1 text-xs text-[#526578]">${note}</p></div><span class="metric-icon" aria-hidden="true">${icon}</span></div></article>`;
const emptyState = (message) => `<p class="rounded-xl border border-dashed border-[#526578]/30 p-5 text-sm text-[#526578]">${esc(message)}</p>`;
function announce(text) { $('#live-message').textContent = text; }
function productRows(items, lowStockSkus) {
  if (!items.length) return emptyState('No hay productos que coincidan con estos controles.');
  return `<div class="overflow-x-auto"><table class="data-table"><caption class="sr-only">Productos sintéticos de la demo</caption><thead><tr><th scope="col">Producto</th><th scope="col">SKU</th><th scope="col">Categoría</th><th scope="col">Almacén</th><th scope="col">Stock / umbral</th><th scope="col">Peso</th><th scope="col">Coste</th></tr></thead><tbody>${items.map((p) => { const isLow = lowStockSkus.has(p.sku); return `<tr><td><span class="font-semibold text-[#03142E]">${esc(p.name)}</span>${p.isFragile ? '<span class="ml-2 text-xs text-[#526578]">Frágil</span>' : ''}</td><td class="font-mono text-xs">${esc(p.sku)}</td><td>${esc(p.category)}</td><td>${esc(p.warehouse)}</td><td><span class="font-semibold ${isLow ? 'text-[#B45309]' : ''}">${p.stockQuantity}</span><span class="text-[#526578]"> / ${p.minStockThreshold}</span>${isLow ? '<span class="ml-2 badge badge-amber">Bajo</span>' : ''}</td><td>${number(p.weightKg, 2)} kg</td><td>${money(p.unitCostUSD)}</td></tr>`; }).join('')}</tbody></table></div>`;
}
function shipmentRows(items) {
  if (!items.length) return emptyState('No hay envíos para mostrar.');
  return `<div class="overflow-x-auto"><table class="data-table"><caption class="sr-only">Envíos sintéticos</caption><thead><tr><th scope="col">ID</th><th scope="col">Ruta</th><th scope="col">SKU / qty.</th><th scope="col">Prioridad</th><th scope="col">Transportista</th><th scope="col">Estado</th><th scope="col">Valor</th></tr></thead><tbody>${items.map((s) => `<tr><td class="font-mono text-xs font-semibold">${esc(s.id)}</td><td><span class="block">${esc(s.origin)}</span><span class="text-xs text-[#526578]">→ ${esc(s.destination.city)}, ${esc(s.destination.country)}</span></td><td>${esc(s.sku)} <span class="text-[#526578]">× ${s.quantity}</span></td><td>${esc(s.priority)}</td><td>${s.carrier ? esc(s.carrier) : '<span class="text-[#526578]">Sin asignar</span>'}</td><td>${statusBadge(s.status)}</td><td>${money(s.declaredValueUSD)}</td></tr>`).join('')}</tbody></table></div>`;
}
function progressRows(entries, total) {
  return entries.map(([label, count], index) => `<div class="flex items-center gap-3"><span class="w-28 shrink-0 truncate text-sm text-[#526578]" title="${esc(label)}">${esc(label)}</span><div class="h-2 flex-1 overflow-hidden rounded-full bg-[#ECEFF1]"><div class="h-full rounded-full ${['bg-[#0758BD]', 'bg-[#00A99D]', 'bg-[#06295D]', 'bg-[#526578]', 'bg-[#00CFFF]'][index % 5]}" style="width:${total ? Math.max((count / total) * 100, count ? 3 : 0) : 0}%"></div></div><span class="tabular w-8 text-right text-sm font-semibold">${count}</span></div>`).join('');
}
function renderOverview() {
  const low = filterLowStockProducts(data.products);
  const categories = countProductsByCategory(data.products);
  const statuses = groupShipmentsByStatus(data.shipments);
  $('#overview-kpis').innerHTML = [card('Productos de muestra', number(data.products.length), 'En dos ubicaciones', '▦'), card('Stock bajo', number(low.length), 'En o bajo el umbral', '⌁'), card('Envíos de muestra', number(data.shipments.length), 'Estados de prueba', '⇢'), card('Valor de inventario', money(calculateTotalInventoryValue(data.products)), 'Valor sintético', '$')].join('');
  $('#overview-categories').innerHTML = progressRows(Object.entries(categories), data.products.length);
  $('#overview-status').innerHTML = progressRows(Object.entries(statuses).map(([status, list]) => [status, list.length]), data.shipments.length);
}
function currentProducts() {
  let list = [...data.products];
  const warehouse = $('#warehouse-filter').value;
  const category = $('#category-filter').value;
  if (warehouse) list = filterProductsByWarehouse(list, warehouse);
  if (category) list = filterProductsByCategory(list, category);
  if ($('#low-stock-filter').checked) list = filterLowStockProducts(list);
  const order = $('#stock-order').value;
  if (order !== 'none') list = sortProductsByStock(list, order);
  return list;
}
function renderInventory() {
  const items = currentProducts();
  const cats = countProductsByCategory(data.products);
  const low = filterLowStockProducts(data.products);
  $('#inventory-kpis').innerHTML = [card('Productos', number(data.products.length), 'Registros sintéticos', '▦'), card('Stock bajo', number(low.length), 'Umbral inclusivo', '⌁'), card('Almacenes', '02', 'Los Angeles · Zaragoza', '⌖'), card('Categorías', number(Object.keys(cats).length), 'Claves disponibles', '◫')].join('');
  $('#product-count').textContent = `${items.length} de ${data.products.length} productos`;
  $('#products-table').innerHTML = productRows(items, new Set(low.map((product) => product.sku)));
  $('#inventory-counts').innerHTML = progressRows(Object.entries(cats), data.products.length);
  $('#inventory-value').textContent = money(calculateTotalInventoryValue(data.products));
}
function renderShipments() {
  const statuses = groupShipmentsByStatus(data.shipments);
  $('#shipment-kpis').innerHTML = Object.entries(statuses).map(([status, list]) => card(status, number(list.length), 'envíos sintéticos', '•')).join('');
  $('#average-distance').textContent = `${number(calculateAverageShipmentDistance(data.shipments), 2)} km`;
  $('#shipments-table').innerHTML = shipmentRows(data.shipments);
  $('#shipment-groups').innerHTML = Object.entries(statuses).map(([status, list]) => `<article class="rounded-xl border border-[#526578]/15 bg-[#F6F5F1] p-4"><div class="flex items-center justify-between gap-2">${statusBadge(status)}<span class="tabular text-xl font-bold">${list.length}</span></div><p class="mt-2 text-xs text-[#526578]">${list.map((s) => esc(s.id)).join(' · ') || 'Sin registros'}</p></article>`).join('');
}
function renderCarrierOptions() {
  $('#carrier-shipment').innerHTML = data.shipments.map((s) => `<option value="${esc(s.id)}">${esc(s.id)} · ${esc(s.destination.city)} (${esc(s.priority)})</option>`).join('');
  $('#carrier-product').innerHTML = data.products.map((p) => `<option value="${esc(p.sku)}">${esc(p.sku)} · ${esc(p.name)}</option>`).join('');
  $('#carrier-choice').innerHTML = data.carriers.map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');
}
function renderCarrierTable() {
  const sorted = sortCarriersByReliability(data.carriers, $('#carrier-order').value);
  $('#carriers-table').innerHTML = `<div class="overflow-x-auto"><table class="data-table"><caption class="sr-only">Transportistas sintéticos ordenados por fiabilidad</caption><thead><tr><th scope="col">Transportista</th><th scope="col">Países</th><th scope="col">En plazo</th><th scope="col">Plazo medio</th></tr></thead><tbody>${sorted.map((c) => `<tr><td class="font-semibold">${esc(c.name)}</td><td>${c.operatesIn.map(esc).join(', ')}</td><td>${number(c.onTimeRate, 1)}%</td><td>${number(c.avgDeliveryDays, 1)} días</td></tr>`).join('')}</tbody></table></div>`;
}
function evaluateCarriers() {
  const shipment = findShipmentById(data.shipments, $('#carrier-shipment').value);
  const product = findProductBySKU(data.products, $('#carrier-product').value);
  const selected = data.carriers.find((c) => c.id === $('#carrier-choice').value);
  if (!shipment || !product || !selected) return;
  const score = scoreCarrierForShipment(selected, shipment, product);
  const cost = calculateShippingCost(shipment, product, selected);
  const best = selectBestCarrier(data.carriers, shipment, product);
  $('#carrier-result').innerHTML = [card('Carrier inspeccionado', esc(selected.name), `${esc(shipment.id)} · ${esc(product.sku)}`, '◈'), card('Puntuación', number(score, 2), 'Retorno de scoreCarrierForShipment', '◎'), card('Coste de ejemplo', money(cost), 'Cálculo sintético · USD', '$'), card('Resultado de selectBestCarrier', best ? esc(best.carrier.name) : 'Sin candidato', best ? `${money(best.cost)} · score ${number(best.score, 2)}` : 'La utilidad devolvió null para este escenario', '↗')].join('');
  announce(`Escenario calculado. Puntuación ${number(score, 2)}. No se modificó ningún envío.`);
}
function renderCarriers() {
  renderCarrierOptions();
  renderCarrierTable();
  const top = findTopCarriers(data.shipments, 3);
  $('#top-carriers').innerHTML = top.length ? top.map((item, i) => `<div class="flex items-center gap-3 rounded-xl bg-[#F6F5F1] p-4"><span class="grid h-9 w-9 place-items-center rounded-full bg-white font-bold text-[#0758BD]">${i + 1}</span><div><p class="font-semibold">${esc(item.carrier)}</p><p class="text-xs text-[#526578]">${item.count} envíos en la muestra</p></div></div>`).join('') : emptyState('Sin registros');
  evaluateCarriers();
}
function validate(entity, mode) {
  const fixtureProduct = data.products[0];
  const fixtureShipment = data.shipments[0];
  const fixtureCarrier = data.carriers[0];
  const makeInvalid = (value, field, invalid) => ({ ...structuredClone(value), [field]: invalid });
  const product = mode === 'invalid' ? makeInvalid(fixtureProduct, 'weightKg', 0) : fixtureProduct;
  const shipment = mode === 'invalid' ? makeInvalid(fixtureShipment, 'quantity', 0) : fixtureShipment;
  const carrier = mode === 'invalid' ? makeInvalid(fixtureCarrier, 'onTimeRate', 101) : fixtureCarrier;
  return entity === 'product' ? validateProduct(product) : entity === 'shipment' ? validateShipment(shipment) : validateCarrier(carrier);
}
function renderValidation() {
  const entity = $('#validation-entity').value;
  const mode = $('#validation-case').value;
  const result = validate(entity, mode);
  const label = entity[0].toUpperCase() + entity.slice(1);
  $('#validation-result').innerHTML = `<div class="flex flex-wrap items-center justify-between gap-3 rounded-xl ${result.valid ? 'border border-emerald-200 bg-emerald-50' : 'border border-amber-200 bg-amber-50'} p-4"><div><p class="font-semibold ${result.valid ? 'text-emerald-900' : 'text-amber-900'}">${label} · ${mode === 'valid' ? 'caso válido' : 'caso con error'} · ${result.valid ? 'Válido' : 'Requiere revisión'}</p><p class="mt-1 text-sm ${result.valid ? 'text-emerald-800' : 'text-amber-800'}">${result.errors.length ? `${result.errors.length} error(es) devueltos por validate${label}.` : 'El paquete devolvió una lista de errores vacía.'}</p></div><span class="rounded-full bg-white px-3 py-1 text-xs font-bold">${result.valid ? 'PASS' : 'ERROR'}</span></div>${result.errors.length ? `<ul class="mt-3 list-inside list-disc space-y-1 rounded-xl border border-[#526578]/15 bg-white p-4 font-mono text-sm text-[#526578]">${result.errors.map((error) => `<li>${esc(error)}</li>`).join('')}</ul>` : ''}<p class="mt-3 text-xs text-[#526578]">Resultado directo del validador del paquete; la demo no modifica ni reordena sus mensajes.</p>`;
  announce(`${label}: ${result.valid ? 'válido' : `${result.errors.length} errores`}.`);
}
function renderReports() {
  const categories = countProductsByCategory(data.products);
  const groups = groupShipmentsByStatus(data.shipments);
  const top = findTopCarriers(data.shipments, Number($('#top-n').value));
  const low = filterLowStockProducts(data.products);
  $('#report-kpis').innerHTML = [card('Productos', number(data.products.length), `${number(low.length)} con stock bajo`, '▦'), card('Envíos', number(data.shipments.length), 'Registros sintéticos', '⇢'), card('Transportistas', number(data.carriers.length), 'Opciones de muestra', '◈'), card('Valor de inventario', money(calculateTotalInventoryValue(data.products)), 'USD · ficticio', '$')].join('');
  $('#report-categories').innerHTML = progressRows(Object.entries(categories), data.products.length);
  $('#report-status').innerHTML = progressRows(Object.entries(groups).map(([status, list]) => [status, list.length]), data.shipments.length);
  $('#report-value').textContent = money(calculateTotalInventoryValue(data.products));
  $('#report-distance').textContent = `${number(calculateAverageShipmentDistance(data.shipments), 2)} km`;
  $('#report-top-carriers').innerHTML = top.length ? top.map((item, i) => `<div class="flex items-center justify-between rounded-xl bg-[#F6F5F1] p-4"><span class="font-semibold"><span class="mr-2 text-[#0758BD]">0${i + 1}</span>${esc(item.carrier)}</span><span class="badge badge-blue">${item.count}</span></div>`).join('') : emptyState('Sin transportistas registrados.');
}
function refresh() {
  renderOverview(); renderInventory(); renderShipments(); renderCarriers(); renderValidation(); renderReports();
}
function setSection(hash) {
  const id = hash.replace('#', '') || 'overview';
  const valid = ['overview', 'inventory', 'shipments', 'carriers', 'validations', 'reports'].includes(id) ? id : 'overview';
  $$('.app-section').forEach((section) => section.classList.toggle('hidden', section.id !== valid));
  $$('.nav-link').forEach((link) => { const active = link.dataset.section === valid; link.classList.toggle('is-active', active); if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
}
function navigateToSection(hash, { focus = false } = {}) {
  const id = hash.replace('#', '');
  setSection(sectionIds.has(id) ? hash : '#overview');
  if (focus) $('#main-content').focus({ preventScroll: true });
}
$$('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const target = link.hash;
  const sectionId = target.slice(1);
  if (!sectionIds.has(sectionId)) return;
  event.preventDefault();
  if (location.hash === target) navigateToSection(target, { focus: link.classList.contains('nav-link') });
  else history.pushState(null, '', target);
  navigateToSection(target, { focus: link.classList.contains('nav-link') });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}));
window.addEventListener('popstate', () => navigateToSection(location.hash));
window.addEventListener('hashchange', () => navigateToSection(location.hash));
['warehouse-filter', 'category-filter', 'stock-order', 'low-stock-filter'].forEach((id) => $(`#${id}`).addEventListener('change', renderInventory));
$('#sku-form').addEventListener('submit', (event) => { event.preventDefault(); const sku = $('#sku-query').value.trim(); const product = findProductBySKU(data.products, sku); $('#search-results').innerHTML = product ? `<div class="rounded-xl border border-[#00DCCF]/50 bg-white p-4"><p class="text-xs font-bold uppercase tracking-wide text-[#0758BD]">Coincidencia · búsqueda SKU sin distinguir mayúsculas</p><p class="mt-1 font-semibold">${esc(product.name)} <span class="font-mono text-sm font-normal">${esc(product.sku)}</span></p><p class="text-sm text-[#526578]">${esc(product.category)} · ${esc(product.warehouse)} · stock ${product.stockQuantity}</p></div>` : emptyState(`No se encontró el SKU “${sku}” en los datos sintéticos.`); announce(product ? `Producto ${product.sku} encontrado.` : 'No se encontró el SKU.'); });
$('#weight-form').addEventListener('submit', (event) => { event.preventDefault(); const weight = Number($('#weight-query').value); const sorted = [...data.products].sort((a, b) => a.weightKg - b.weightKg); const index = Number.isFinite(weight) && $('#weight-query').value !== '' ? binarySearchProductByWeight(sorted, weight) : -1; $('#search-results').innerHTML = index >= 0 ? `<div class="rounded-xl border border-[#00DCCF]/50 bg-white p-4"><p class="text-xs font-bold uppercase tracking-wide text-[#0758BD]">Coincidencia · índice ${index} en copia ordenada</p><p class="mt-1 font-semibold">${esc(sorted[index].name)} <span class="font-mono text-sm font-normal">${esc(sorted[index].sku)}</span></p><p class="text-sm text-[#526578]">Peso exacto: ${number(sorted[index].weightKg, 2)} kg</p></div>` : emptyState('No se encontró coincidencia exacta. La búsqueda requiere pesos ordenados y se ejecutó sobre una copia.'); announce(index >= 0 ? 'Se encontró un producto por peso.' : 'No hubo coincidencia exacta de peso.'); });
$('#shipment-form').addEventListener('submit', (event) => { event.preventDefault(); const id = $('#shipment-query').value.trim(); const shipment = findShipmentById(data.shipments, id); $('#shipment-search-result').innerHTML = shipment ? `<div class="rounded-xl border border-[#00DCCF]/50 bg-white p-4"><div class="flex flex-wrap items-center justify-between gap-2"><p class="font-semibold">${esc(shipment.id)} · ${esc(shipment.sku)}</p>${statusBadge(shipment.status)}</div><p class="mt-2 text-sm text-[#526578]">${esc(shipment.origin)} → ${esc(shipment.destination.city)}, ${esc(shipment.destination.country)} · ${shipment.quantity} unidad(es)</p><p class="mt-1 text-sm text-[#526578]">${shipment.carrier ? esc(shipment.carrier) : 'Sin transportista'} · ${esc(shipment.priority)} · ${money(shipment.declaredValueUSD)}</p></div>` : emptyState(`No se encontró el ID “${id}”.`); announce(shipment ? `Envío ${shipment.id} encontrado.` : 'No se encontró el envío.'); });
$('#carrier-order').addEventListener('change', renderCarrierTable);
$('#evaluate-carriers').addEventListener('click', evaluateCarriers);
['carrier-shipment', 'carrier-product', 'carrier-choice'].forEach((id) => $(`#${id}`).addEventListener('change', evaluateCarriers));
$('#run-validation').addEventListener('click', renderValidation);
['validation-entity', 'validation-case'].forEach((id) => $(`#${id}`).addEventListener('change', renderValidation));
$('#top-n').addEventListener('change', renderReports);
$('#reset-button').addEventListener('click', () => { data = cloneFixtures(); ['warehouse-filter', 'category-filter'].forEach((id) => $(`#${id}`).value = ''); $('#stock-order').value = 'none'; $('#low-stock-filter').checked = false; $('#sku-query').value = ''; $('#weight-query').value = ''; $('#shipment-query').value = ''; $('#carrier-shipment').selectedIndex = 0; $('#carrier-product').selectedIndex = 0; $('#carrier-choice').selectedIndex = 0; $('#carrier-order').value = 'desc'; $('#validation-entity').value = 'product'; $('#validation-case').value = 'valid'; $('#top-n').value = '3'; $('#search-results').innerHTML = ''; $('#shipment-search-result').innerHTML = ''; history.pushState(null, '', '#overview'); setSection('#overview'); refresh(); announce('La demo se restableció a los datos sintéticos iniciales.'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
setSection(location.hash); refresh();
