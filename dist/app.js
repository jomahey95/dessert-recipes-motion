/* Dessert Recipes — dependency-free motion and local recipe collection. */
const $ = (selector) => document.querySelector(selector);
const dom = Object.fromEntries(['app','feed','recipe-list','page-title','favorites-toggle','empty-state','detail-panel','detail-scroll','detail-content','detail-hero','hero-image','back-button','save-button','home-button','add-button','recipe-dialog','recipe-form','close-dialog','toast','topbar'].map(id => [id.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), $(`#${id}`)]));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
};
const recipes = [
  {
    id:'lemon', title:'Lemon Cheesecake', color:'#ffce43', image:'lemon',
    description:'Tart Lemon Cheesecake sits atop an almond-graham cracker crust to add a delightful nuttiness to the traditional graham cracker crust. Finish this cheesecake with lemon curd for double the tart punch!',
    ingredients:['110 g digestive biscuits','50 g butter','25 g light brown soft sugar','350 g mascarpone','75 g caster sugar','Zest of 1 lemon','Juice of 2 lemons','150 ml double cream','Lemon slices and mint, to finish'],
    steps:['Crush the digestive biscuits into fine crumbs. Melt the butter, then mix with the crumbs and brown sugar.','Press the biscuit mixture firmly into the bottom of a lined 20 cm springform tin. Chill for 30 minutes.','Beat the mascarpone, caster sugar, lemon zest and lemon juice together until smooth.','In another bowl, whip the cream to soft peaks. Gently fold it into the lemon mixture.','Spoon the filling over the chilled biscuit base and smooth the top. Refrigerate for at least 6 hours, preferably overnight.','Carefully remove from the tin. Decorate with thin lemon slices and fresh mint, then cut into wedges.']
  },
  {
    id:'macarons', title:'Macaroons', color:'#48c6df', image:'macarons',
    description:'Soft and chewy on the inside, crisp and golden on the outside — these are the perfect macarons.',
    ingredients:['1¾ cups powdered sugar (210 g)','1 cup almond flour (95 g), finely ground','1 teaspoon salt, divided','3 egg whites, at room temperature','¼ cup granulated sugar (50 g)','½ teaspoon vanilla extract','2 drops gel food coloring','1 cup unsalted butter (230 g), softened','3 cups powdered sugar (360 g)','3 tablespoons heavy cream'],
    steps:['In a food processor, combine the powdered sugar, almond flour and half the salt. Process until extra fine, then sift into a large bowl.','In a separate bowl, beat the egg whites and the remaining salt until soft peaks form. Gradually add the granulated sugar and continue beating until stiff, glossy peaks form.','Add the vanilla and gel food coloring. Beat just until incorporated.','Fold one third of the sifted almond flour mixture into the egg whites using a spatula. Continue adding the dry ingredients, folding gently after each addition.','Continue folding until the batter flows from the spatula in a thick, continuous ribbon. You should be able to draw a figure eight without the ribbon breaking.','Transfer the batter into a piping bag fitted with a round tip.','Pipe 3 cm circles onto a baking sheet lined with parchment, leaving space between each one.','Tap the baking sheet firmly on the counter several times to release trapped air.','Let the piped shells rest at room temperature for 30–60 minutes, until a dry skin forms on top.','Preheat the oven to 150°C / 300°F. Bake for 15–17 minutes, until the shells have risen and set.','Allow the shells to cool completely before removing them from the parchment.','For the buttercream, beat the softened butter until pale and fluffy. Sift in the powdered sugar and beat until smooth.','Add the cream a spoonful at a time, beating until the buttercream is light, smooth and easy to pipe.','Transfer the buttercream to a piping bag fitted with a round tip.','Pipe a little buttercream onto the flat side of one shell. Top with a second shell and gently press together. Repeat with the remaining shells.','Place in an airtight container and refrigerate overnight. Bring to room temperature before serving.']
  },
  {
    id:'cupcakes', title:'Cream Cupcakes', color:'#ff9fbe', image:'cupcakes',
    description:'Bake these easy vanilla cupcakes in just 35 minutes. Perfect for birthdays, picnics and a little afternoon treat.',
    ingredients:['125 g unsalted butter, softened','125 g caster sugar','2 large eggs','1 teaspoon vanilla extract','125 g self-raising flour','2 tablespoons milk','150 g unsalted butter, for the frosting','300 g icing sugar','Pink, lilac and green food coloring'],
    steps:['Preheat the oven to 180°C / 350°F. Line a cupcake tin with paper cases.','Cream the butter and caster sugar until light and fluffy. Beat in the eggs one at a time, then add the vanilla.','Fold in the flour, then stir in enough milk to make a soft, dropping consistency.','Divide the batter between the cases. Bake for 18–20 minutes, until lightly golden and a skewer comes out clean.','Cool completely on a wire rack. Beat the frosting butter and icing sugar until smooth and fluffy.','Divide and tint the frosting. Pipe roses, little flowers and leaves onto the cooled cupcakes.']
  },
  {
    id:'chocolate-cheesecake', title:'Chocolate Cheesecake', color:'#ff6c45', image:'chocolate-cheesecake',
    description:'This creamy chocolate cheesecake needs no oven. A little chocolate and a lot of happiness.',
    ingredients:['200 g chocolate biscuits','80 g butter, melted','250 g dark chocolate','500 g cream cheese','100 g icing sugar','250 ml double cream','Cocoa powder, to finish'],
    steps:['Crush the biscuits and mix with the melted butter. Press into a lined 20 cm cake tin and chill.','Melt the chocolate gently and leave to cool slightly. Beat the cream cheese and icing sugar until smooth.','Stir in the melted chocolate. Whip the cream separately, then fold it into the filling.','Spread over the biscuit base, smooth the top and chill for at least 6 hours.','Dust lightly with cocoa, remove from the tin and slice.']
  },
  {
    id:'fruit-plate', title:'Fruit Plate', color:'#d8dc44', image:'fruit-plate',
    description:'A rainbow on a plate. Fresh seasonal fruit, simply sliced and beautifully shared.',
    ingredients:['2 oranges','2 ripe kiwis','250 g strawberries','150 g blueberries','½ pineapple','Fresh mint','1 tablespoon honey, optional'],
    steps:['Wash and gently dry the berries. Peel the oranges, kiwis and pineapple.','Slice the fruit into bite-sized pieces, keeping each variety separate.','Arrange in colorful sections on a large round platter.','Add fresh mint. Drizzle with a little honey if you like, and serve chilled.']
  },
  {
    id:'cream-cake', title:'White Cream Cake', color:'#f2e4e9', image:'cream-cake',
    description:'Fluffy vanilla sponge, clouds of whipped cream and the sweetest little finishing touches.',
    ingredients:['200 g butter, softened','200 g caster sugar','4 eggs','200 g self-raising flour','1 teaspoon vanilla extract','400 ml double cream','2 tablespoons icing sugar','Fresh strawberries'],
    steps:['Heat the oven to 180°C / 350°F. Grease and line two 20 cm cake tins.','Beat the butter and sugar until fluffy. Add the eggs one at a time, then fold in the flour and vanilla.','Divide between the tins and bake for 22–25 minutes. Cool completely.','Whip the cream with icing sugar to soft peaks. Use half to sandwich the cakes together.','Spread the remaining cream over the cake and decorate with strawberries. Keep refrigerated until serving.']
  },
  {
    id:'fruit-pie', title:'Fruit Pie', color:'#ffd656', image:'fruit-pie',
    description:'Buttery pastry, silky vanilla custard and a lovely crown of colorful fresh fruit.',
    ingredients:['1 ready-made sweet pastry case','300 ml whole milk','3 egg yolks','60 g caster sugar','25 g cornflour','1 teaspoon vanilla extract','300 g mixed fresh fruit','2 tablespoons apricot jam'],
    steps:['Bake the pastry case according to the packet instructions and leave to cool.','Whisk the egg yolks, sugar and cornflour. Heat the milk with the vanilla until steaming.','Slowly whisk the warm milk into the egg mixture. Return to the pan and cook gently, stirring, until thick.','Cover the custard surface and cool, then spoon into the pastry case.','Arrange the fruit on top. Warm the apricot jam with a teaspoon of water and brush over the fruit to glaze.']
  },
  {
    id:'powdered-cake', title:'Powdered Cake', color:'#f4dce7', image:'cream-cake',
    description:'A soft vanilla cake with a delicate dusting of sweetness. Simple, light and lovely.',
    ingredients:['180 g butter, softened','180 g caster sugar','3 eggs','180 g self-raising flour','1 teaspoon vanilla extract','3 tablespoons milk','Icing sugar, for dusting'],
    steps:['Heat the oven to 175°C / 350°F. Grease and line a 20 cm round cake tin.','Cream the butter and sugar. Beat in the eggs one at a time, followed by the vanilla.','Fold in the flour and milk. Pour into the prepared tin and smooth the surface.','Bake for 30–35 minutes, until golden and a skewer comes out clean.','Let cool completely and finish with a light dusting of icing sugar.']
  },
  {
    id:'strawberries', title:'Strawberries', color:'#ff3b53', image:'strawberries',
    description:'Well served in a cup, a little cream makes strawberries a very lovely thing.',
    ingredients:['500 g ripe strawberries','150 ml double cream','1 tablespoon icing sugar','½ teaspoon vanilla extract','Fresh mint leaves'],
    steps:['Rinse the strawberries quickly in cool water, drain and dry gently.','Hull the berries and halve the larger ones.','Whip the cream with the icing sugar and vanilla until softly thickened.','Spoon the strawberries into bowls, add the cream and finish with a little mint.']
  },
  {
    id:'chocolate-cake', title:'Chocolate Cake', color:'#ff8150', image:'chocolate-cake',
    description:'The best Chocolate Cake! Rich, tender and deeply chocolatey. A cake for every celebration.',
    ingredients:['200 g plain flour','200 g caster sugar','60 g cocoa powder','1½ teaspoons baking powder','2 eggs','200 ml whole milk','100 ml vegetable oil','200 g dark chocolate','200 ml double cream'],
    steps:['Heat the oven to 180°C / 350°F. Grease and line a 20 cm round cake tin.','Mix the flour, sugar, cocoa and baking powder. Whisk in the eggs, milk and oil until smooth.','Pour into the tin and bake for 35–40 minutes, until a skewer inserted in the center comes out clean. Cool completely.','Heat the cream until steaming, pour over the chopped chocolate and leave for 2 minutes. Stir until glossy.','Spread the cooled ganache over the cake. Decorate with chocolate curls and slice.']
  },
  {
    id:'apple-pie', title:'Apple Pie', color:'#f4e2e8', image:'apple-pie',
    description:'This warm grandmother’s apple pie recipe has never let us down. Golden pastry, cinnamon and love.',
    ingredients:['500 g shortcrust pastry','6 apples, peeled and sliced','100 g brown sugar','1 teaspoon ground cinnamon','1 tablespoon lemon juice','2 tablespoons plain flour','1 egg, beaten'],
    steps:['Heat the oven to 190°C / 375°F. Roll out two thirds of the pastry and line a 23 cm pie dish.','Toss the apples with the sugar, cinnamon, lemon juice and flour. Spoon into the pastry case.','Roll out the remaining pastry and cut into strips. Weave a lattice over the filling and pinch the edges together.','Brush with beaten egg and bake for 45–50 minutes, until golden and bubbling.','Let the pie rest for at least 20 minutes before slicing. Serve warm.']
  }
];

const validCustomRecipe = value => value && typeof value.id === 'string' && value.id.startsWith('custom-') && typeof value.title === 'string' && typeof value.description === 'string' && /^#[\da-f]{6}$/i.test(value.color) && ['lemon','macarons','cupcakes'].includes(value.image) && Array.isArray(value.ingredients) && value.ingredients.every(item=>typeof item==='string') && Array.isArray(value.steps) && value.steps.every(item=>typeof item==='string');
const savedCustom = storage.get('dessert-custom-recipes-v1', []);
if (Array.isArray(savedCustom)) recipes.push(...savedCustom.filter(validCustomRecipe));
const storedFavorites = storage.get('dessert-favorites-v1', []);
const state = { current:null, busy:false, pendingHistory:false, savedOnly:false, favorites:new Set(Array.isArray(storedFavorites)?storedFavorites.filter(id=>typeof id==='string'):[]), feedScroll:0, enteredFromApp:false };
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const imagePath = recipe => `/assets/${recipe.image}.webp`;
const icon = (name, className='') => `<svg class="icon ${className}" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
let cards = [];
let toastTimeout;

function toast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(()=>dom.toast.classList.remove('visible'),2200);
}

function renderFeed() {
  const visibleRecipes = recipes.filter(recipe=>!state.savedOnly || state.favorites.has(recipe.id));
  dom.recipeList.innerHTML = visibleRecipes.map((recipe,index)=>`<div class="card-slot"><button type="button" class="recipe-card" data-recipe="${escapeHTML(recipe.id)}" style="--recipe-color:${recipe.color}" aria-label="Open ${escapeHTML(recipe.title)} recipe"><div class="card-copy"><h2>${escapeHTML(recipe.title)}</h2><p>${escapeHTML(recipe.description)}</p></div><img class="card-image" src="${imagePath(recipe)}" alt="${escapeHTML(recipe.title)} on a round plate" width="320" height="320" ${index<3?'fetchpriority="high"':'loading="lazy"'} draggable="false"></button></div>`).join('');
  cards = [...dom.recipeList.querySelectorAll('.recipe-card')];
  dom.emptyState.hidden = visibleRecipes.length>0;
  dom.pageTitle.textContent = state.savedOnly?'Saved Recipes':'Dessert Recipes';
  dom.favoritesToggle.setAttribute('aria-pressed',String(state.savedOnly));
  dom.favoritesToggle.setAttribute('aria-label',state.savedOnly?'Show all recipes':'Show saved recipes');
}

/* Velocity-driven perspective: cards lean into the swipe, then settle back. */
let lastScroll = 0, lastTime = performance.now(), velocity = 0, tilt = 0, motionFrame = 0;
function motionTick() {
  velocity *= .86;
  tilt += (clamp(-velocity*38,-66,66)-tilt)*.19;
  const height = dom.feed.clientHeight;
  for (const card of cards) {
    const position = (card.parentElement.offsetTop-dom.feed.scrollTop+card.offsetHeight/2-height/2)/height;
    const angle = tilt*(.82+Math.min(Math.abs(position),1)*.18);
    const scale = 1-Math.abs(tilt)*.00115;
    card.style.transform = `perspective(850px) rotateX(${angle.toFixed(2)}deg) translateZ(${(-Math.abs(tilt)*1.8).toFixed(2)}px) scale(${scale.toFixed(4)})`;
  }
  if (Math.abs(velocity)>.003 || Math.abs(tilt)>.06) motionFrame=requestAnimationFrame(motionTick);
  else { for(const card of cards) card.style.transform=''; motionFrame=0; tilt=0; }
}
dom.feed.addEventListener('scroll',()=>{
  const now=performance.now();
  const delta=dom.feed.scrollTop-lastScroll;
  const elapsed=now-lastTime;
  velocity=clamp(delta/Math.max(12,elapsed),-4.5,4.5);
  lastScroll=dom.feed.scrollTop; lastTime=now;
  if(!reducedMotion.matches&&!state.current&&!motionFrame) motionFrame=requestAnimationFrame(motionTick);
},{passive:true});

function renderDetails(recipe) {
  dom.detailHero.style.setProperty('--recipe-color',recipe.color);
  dom.detailPanel.style.setProperty('--recipe-color',recipe.color);
  dom.heroImage.src=imagePath(recipe);
  dom.heroImage.alt=recipe.title;
  dom.detailPanel.setAttribute('aria-label',`${recipe.title} recipe`);
  dom.detailContent.innerHTML = `<h2 id="recipe-title" style="--delay:130ms">${escapeHTML(recipe.title)}</h2><p class="recipe-description" style="--delay:180ms">${escapeHTML(recipe.description)}</p><section aria-labelledby="ingredients-title" style="--delay:220ms"><h3 class="section-heading" id="ingredients-title">INGREDIENTS</h3><ul class="ingredient-list">${recipe.ingredients.map((ingredient,index)=>`<li><label class="ingredient-row" style="--delay:${260+index*42}ms"><input type="checkbox" aria-label="${escapeHTML(ingredient)}"><span class="ingredient-icon">${icon('bowl','bowl-icon')}${icon('check','check-icon')}</span><span class="ingredient-label">${escapeHTML(ingredient)}</span></label></li>`).join('')}</ul></section><section aria-labelledby="steps-title" style="--delay:320ms"><h3 class="section-heading" id="steps-title">STEPS</h3><ol class="steps-list">${recipe.steps.map(step=>`<li class="step-row">${escapeHTML(step)}</li>`).join('')}</ol></section><p class="recipe-note">A little patience. A lot of love. ♡</p>`;
  updateSaveButton();
  document.title=`${recipe.title} · Dessert Recipes`;
}

function updateSaveButton() {
  const saved=state.current&&state.favorites.has(state.current.id);
  dom.saveButton.setAttribute('aria-pressed',String(Boolean(saved)));
  dom.saveButton.setAttribute('aria-label',saved?'Remove saved recipe':'Save recipe');
}

function updateHero() {
  const y=dom.detailScroll.scrollTop;
  const initial=parseFloat(getComputedStyle(dom.app).getPropertyValue('--hero-height'))||314;
  const progress=clamp(y/(initial-137),0,1);
  const initialSize=dom.app.clientWidth<=360?240:260;
  const size=initialSize-(initialSize-102)*progress;
  dom.detailHero.style.height=`${initial-(initial-137)*progress}px`;
  dom.heroImage.style.width=`${size}px`;
  dom.heroImage.style.height=`${size}px`;
  dom.heroImage.style.top=`${45-17*progress}px`;
  dom.heroImage.style.transform=`translateX(-50%) rotate(${reducedMotion.matches?0:y*.34}deg)`;
}
let heroFrame=0;
dom.detailScroll.addEventListener('scroll',()=>{if(!heroFrame)heroFrame=requestAnimationFrame(()=>{updateHero();heroFrame=0;});},{passive:true});

function rectStyles(rect) { return {left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`}; }
async function morph(recipe, fromSurface, toSurface, fromImage, toImage, opening) {
  if(reducedMotion.matches)return;
  const surface=document.createElement('div');
  surface.className='transition-surface';
  Object.assign(surface.style,rectStyles(fromSurface),{background:recipe.color,borderRadius:opening?'24px':'0 0 26px 26px'});
  const picture=document.createElement('img');
  picture.className='transition-image';picture.src=imagePath(recipe);picture.alt='';
  Object.assign(picture.style,rectStyles(fromImage));
  document.body.append(surface,picture);
  const duration=590;
  const options={duration,easing:'cubic-bezier(.22,.78,.2,1)',fill:'forwards'};
  const animations=[surface.animate([rectStyles(fromSurface),{...rectStyles(toSurface),borderRadius:opening?'0 0 26px 26px':'24px'}],options),picture.animate([{...rectStyles(fromImage),transform:opening?'rotate(-5deg)':'rotate(0deg)'},{...rectStyles(toImage),transform:'rotate(0deg)'}],options)];
  try { await Promise.all(animations.map(animation=>animation.finished)); }
  finally { surface.remove();picture.remove(); }
}

async function openRecipe(id,{push=true,animate=true}={}) {
  if(state.busy)return;
  const recipe=recipes.find(item=>item.id===id);
  if(!recipe)return;
  state.busy=true;
  state.feedScroll=dom.feed.scrollTop;
  const card=cards.find(element=>element.dataset.recipe===id);
  if(motionFrame)cancelAnimationFrame(motionFrame);
  motionFrame=0;velocity=0;tilt=0;
  for(const element of cards)element.style.transform='';
  const sourceSurface=card?.getBoundingClientRect();
  const sourceImage=card?.querySelector('img').getBoundingClientRect();
  state.current=recipe;
  renderDetails(recipe);
  dom.detailPanel.hidden=false;
  dom.detailPanel.classList.add('is-opening');
  dom.detailScroll.scrollTop=0;
  updateHero();
  dom.feed.inert=true;dom.topbar.inert=true;
  dom.homeButton.removeAttribute('aria-current');
  if(push){history.pushState({recipe:id},'',`#recipe=${encodeURIComponent(id)}`);state.enteredFromApp=true;}
  if(card&&animate){
    dom.heroImage.style.visibility='hidden';
    const targetImage=dom.heroImage.getBoundingClientRect();
    await morph(recipe,sourceSurface,dom.detailHero.getBoundingClientRect(),sourceImage,targetImage,true);
    dom.heroImage.style.visibility='';
  }
  state.busy=false;
  dom.backButton.focus({preventScroll:true});
  setTimeout(()=>dom.detailPanel.classList.remove('is-opening'),1100);
  if(state.pendingHistory){state.pendingHistory=false;syncHistory();}
}

async function closeRecipe({animate=true}={}) {
  if(!state.current||state.busy)return;
  state.busy=true;
  const recipe=state.current;
  const card=cards.find(element=>element.dataset.recipe===recipe.id);
  const fromSurface=dom.detailHero.getBoundingClientRect();
  const fromImage=dom.heroImage.getBoundingClientRect();
  const targetSurface=card?.getBoundingClientRect();
  const targetImage=card?.querySelector('img').getBoundingClientRect();
  dom.heroImage.style.visibility='hidden';
  dom.detailPanel.style.visibility='hidden';
  if(card&&animate)await morph(recipe,fromSurface,targetSurface,fromImage,targetImage,false);
  dom.detailPanel.hidden=true;
  dom.detailPanel.style.visibility='';
  dom.heroImage.style.visibility='';
  dom.feed.inert=false;dom.topbar.inert=false;
  dom.detailPanel.classList.remove('is-opening');
  state.current=null;state.busy=false;
  document.title='Dessert Recipes';
  dom.homeButton.setAttribute('aria-current','page');
  if(state.savedOnly){const scroll=dom.feed.scrollTop;renderFeed();dom.feed.scrollTop=scroll;}
  const focusCard=cards.find(element=>element.dataset.recipe===recipe.id);
  (focusCard||dom.feed).focus({preventScroll:true});
  if(state.pendingHistory){state.pendingHistory=false;syncHistory();}
}

function goBack() {
  if(state.busy||!state.current)return;
  if(state.enteredFromApp&&location.hash.startsWith('#recipe='))history.back();
  else {history.replaceState(null,'',location.pathname+location.search);closeRecipe();}
}

dom.recipeList.addEventListener('click',event=>{
  const card=event.target.closest('[data-recipe]');
  if(card)openRecipe(card.dataset.recipe);
});
dom.backButton.addEventListener('click',goBack);
dom.saveButton.addEventListener('click',()=>{
  if(!state.current)return;
  const id=state.current.id;
  if(state.favorites.has(id)){state.favorites.delete(id);toast('Removed from your saved recipes');}
  else {state.favorites.add(id);toast('A little sweetness, saved ♡');}
  storage.set('dessert-favorites-v1',[...state.favorites]);
  updateSaveButton();
});
dom.favoritesToggle.addEventListener('click',()=>{state.savedOnly=!state.savedOnly;renderFeed();dom.feed.scrollTop=0;lastScroll=0;});
dom.homeButton.addEventListener('click',()=>{
  if(state.current){goBack();return;}
  if(state.savedOnly){state.savedOnly=false;renderFeed();}
  dom.feed.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'});
});
dom.addButton.addEventListener('click',()=>{if(!state.busy)dom.recipeDialog.showModal();});
dom.closeDialog.addEventListener('click',()=>dom.recipeDialog.close());
dom.recipeDialog.addEventListener('click',event=>{if(event.target===dom.recipeDialog){const r=dom.recipeDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dom.recipeDialog.close();}});
dom.recipeForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const data=new FormData(dom.recipeForm);
  const lines=name=>String(data.get(name)||'').split('\n').map(value=>value.trim()).filter(Boolean);
  const uniqueId=Array.from(crypto.getRandomValues(new Uint8Array(16)),byte=>byte.toString(16).padStart(2,'0')).join('');
  const recipe={id:`custom-${uniqueId}`,title:String(data.get('title')).trim(),description:String(data.get('description')).trim(),ingredients:lines('ingredients'),steps:lines('steps'),color:String(data.get('color')),image:String(data.get('image'))};
  if(!recipe.title||!recipe.description||!recipe.ingredients.length||!recipe.steps.length){toast('Add a name, ingredients and a few steps');return;}
  if(!validCustomRecipe(recipe))return;
  const custom=recipes.filter(item=>item.id.startsWith('custom-'));
  const persisted=storage.set('dessert-custom-recipes-v1',[...custom,recipe]);
  recipes.push(recipe);
  dom.recipeDialog.close();dom.recipeForm.reset();
  if(state.current){history.replaceState(null,'',location.pathname+location.search);await closeRecipe({animate:false});}
  state.savedOnly=false;renderFeed();
  const added=cards.find(card=>card.dataset.recipe===recipe.id);
  added?.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'center'});
  toast(persisted?'Your recipe is in the collection ♡':'Recipe added for this visit');
});
function syncHistory() {
  if(state.busy){state.pendingHistory=true;return;}
  let id='';try{id=decodeURIComponent(location.hash.replace(/^#recipe=/,''));}catch{}
  if(id&&recipes.some(recipe=>recipe.id===id)){if(state.current?.id!==id)openRecipe(id,{push:false});}
  else {state.enteredFromApp=false;closeRecipe();}
}
window.addEventListener('popstate',syncHistory);
window.addEventListener('keydown',event=>{if(event.key==='Escape'&&!dom.recipeDialog.open)goBack();});
window.addEventListener('resize',()=>{if(state.current)updateHero();});
renderFeed();
if(location.hash.startsWith('#recipe=')){
  let id='';try{id=decodeURIComponent(location.hash.slice(8));}catch{}
  if(recipes.some(recipe=>recipe.id===id))openRecipe(id,{push:false,animate:false});
}
