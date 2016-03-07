import React from 'react';
import Navigation from './navigation';
import Content from './content';
import RoundedToggle from './rounded_toggle';
import PureRenderMixin from 'react-pure-render/mixin';
import GithubSlugger from 'github-slugger';
import debounce from 'lodash.debounce';
import { brandNames, brandClasses } from '../../custom';

let slugger = new GithubSlugger();
let slug = title => { slugger.reset(); return slugger.slug(title); };

let languageOptions = ['cURL', 'CLI', 'Python', 'JavaScript'];

let debouncedReplaceState = debounce(hash => {
  window.history.replaceState('', '', hash);
}, 100);

var App = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    content: React.PropTypes.string.isRequired,
    ast: React.PropTypes.object.isRequired
  },
  getInitialState() {
    var active = 'Introduction';

    if (process.browser) {
      let hash = window.location.hash.split('#').pop();
      let mqls = {
        'desktop': window.matchMedia('(min-width: 961px)'),
        'tablet': window.matchMedia('(max-width: 960px)'),
        'mobile': window.matchMedia('(max-width: 640px)')
      };
      Object.keys(mqls).forEach(key => {
        mqls[key].addListener(this.mediaQueryChanged);
      });
      if (hash) {
        let headingForHash = this.props.ast.children
          .filter(child => child.type === 'heading')
          .find(heading => heading.data.id === hash);
        if (headingForHash) {
          active = headingForHash.children[0].value;
        }
      }
      return {
        mqls: mqls,
        queries: {},
        language: 'cURL',
        activeSection: active,
        showNav: false
      };
    } else {
      return {
        mqls: {
          desktop: true
        },
        queries: {
          desktop: true
        },
        language: 'cURL',
        activeSection: '',
        showNav: false
      };
    }
  },
  toggleNav() {
    this.setState({ showNav: !this.state.showNav });
  },
  componentDidMount() {
    this.mediaQueryChanged();
    this.onScroll = debounce(this._onScroll, 100);
    document.addEventListener('scroll', this.onScroll);
    this._onScroll();
  },
  _onScroll() {
    var sections = document.querySelectorAll('div.section');
    if (!sections.length) return;
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.bottom > 0) {
        this.setState({
          activeSection: sections[i].getAttribute('data-title')
        });
        return;
      }
    }
  },
  mediaQueryChanged() {
    this.setState({
      queries: {
        mobile: this.state.mqls.mobile.matches,
        tablet: this.state.mqls.tablet.matches,
        desktop: this.state.mqls.desktop.matches
      }
    });
  },
  componentWillUnmount() {
    Object.keys(this.state.mqls).forEach(key =>
      this.state.mqls[key].removeListener(this.mediaQueryChanged));
    document.body.removeEventListener('scroll', this.onScroll);
  },
  onChangeLanguage(language) {
    this.setState({ language });
  },
  componentDidUpdate(_, prevState) {
    if (prevState.activeSection !== this.state.activeSection) {
      // when the section changes, replace the hash
      debouncedReplaceState(`#${slug(this.state.activeSection)}`);
    } else if (prevState.language !== this.state.language) {
      // when the language changes, use the hash to set scroll
      window.location = window.location;
    }
  },
  handleClick(activeSection) {
    setTimeout(() => {
      this.setState({ activeSection });
    }, 10);
    if (!this.state.queries.desktop) {
      this.toggleNav();
    }
  },
  render() {
    let { ast } = this.props;
    let { activeSection, queries, showNav } = this.state;
    return (<div className='container unlimiter'>

      {/* Content background */ }
      {!queries.mobile && <div className={`fixed-top fixed-right ${queries.desktop && 'space-left16'}`}>
        <div className='fill-light col6 pin-right'></div>
      </div>}

      {/* Desktop nav */ }
      {queries.desktop && <div className='space-top5 scroll-styled pad1 width16 sidebar fixed-left fill-dark dark'>
        <Navigation
          handleClick={this.handleClick}
          activeSection={activeSection}
          ast={ast} />
      </div>}

      {/* Content */ }
      <div className={`${queries.desktop && 'space-left16'}`}>
        <Content
          ast={ast}
          queries={queries}
          language={this.state.language.toLowerCase()}/>
      </div>

      {/* Language toggle */ }
      <div className={`fixed-top ${queries.desktop && 'space-left16'}`}>
        <div className={`events fill-light bottom-shadow pad1 col6 pin-topright ${queries.tablet && 'dark fill-blue'} ${queries.mobile && 'space-top5 fixed-topright'}`}>
          <div className='space-right1 small quiet inline'>
            Show examples in:
          </div>
          <RoundedToggle
            options={languageOptions}
            onChange={this.onChangeLanguage}
            active={this.state.language} />
        </div>
      </div>

      {/* Header */ }
      <div className={`fill-dark dark bottom-shadow fixed-top ${queries.tablet ? 'pad1y pad2x col6' : 'pad0 width16'}`}>
        <a href='/' className={`active space-top1 space-left1 pin-topleft icon round dark pad0 ${brandClasses}`}></a>
        <div className={`strong small pad0 ${queries.mobile && 'space-left3'} ${queries.tablet ? 'space-left2' : 'space-left4 line-height15' }`}>
          {queries.desktop ? brandNames.desktop :
            queries.mobile ? brandNames.mobile : brandNames.tablet}
        </div>
        {queries.tablet && <div>
            <button
              onClick={this.toggleNav}
              className={`short quiet pin-topright button rcon ${showNav ? 'caret-up' : 'caret-down'} space-right1 space-top1`}>
              <span className='micro'>{activeSection}</span>
            </button>
            {showNav && <div
              className='fixed-left keyline-top fill-dark pin-left col6 pad2 scroll-styled space-top5'>
                <Navigation
                  handleClick={this.handleClick}
                  activeSection={activeSection}
                  ast={ast} />
              </div>}
          </div>}
      </div>

    </div>);
  }
});

module.exports = App;
