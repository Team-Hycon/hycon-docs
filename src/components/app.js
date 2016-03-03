import React from 'react';
import Navigation from './navigation';
import Content from './content';
import RoundedToggle from './rounded_toggle';
import PureRenderMixin from 'react-pure-render/mixin';
import GithubSlugger from 'github-slugger';
import debounce from 'lodash.debounce';

let slugger = new GithubSlugger();
let slug = title => { slugger.reset(); return slugger.slug(title); };

let languageOptions = ['curl', 'cli', 'python', 'javascript'];

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
        language: 'curl',
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
        language: 'curl',
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
  },
  mediaQueryChanged() {
    var queries = {
      mobile: this.state.mqls.mobile.matches,
      tablet: this.state.mqls.tablet.matches,
      desktop: this.state.mqls.desktop.matches
    };
    this.setState({ queries });
  },
  componentWillUnmount() {
    Object.keys(this.state.mqls).forEach(key =>
      this.state.mqls[key].removeListener(this.mediaQueryChanged));
  },
  onChangeLanguage(language) {
    this.setState({ language });
  },
  onSpy(activeSection) {
    this.setState({ activeSection });
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
        <div className='fill-dark col6 pin-right'></div>
      </div>}

      {/* Desktop nav */ }
      {queries.desktop && <div className='space-top5 scroll-styled pad1 width16 sidebar fixed-left fill-light'>
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
          onSpy={this.onSpy}
          language={this.state.language}/>
      </div>

      {/* Language toggle */ }
      <div className={`fixed-top dark ${queries.desktop && 'space-left16'}`}>
        <div className={`events fill-dark2 pad1 col6 pin-topright ${queries.mobile && 'space-top5 fixed-topright'}`}>
          <RoundedToggle
            options={languageOptions}
            onChange={this.onChangeLanguage}
            active={this.state.language} />
        </div>
      </div>

      {/* Header */ }
      <div className={`fill-gray fixed-top ${queries.tablet ? 'pad1y pad2x col6' : 'pad0 width16'}`}>
        <a href='/' className='active space-top1 space-left1 pin-topleft icon round fill-red dark pad0'></a>
        <div className={`strong small pad0 ${queries.mobile && 'space-left3'} ${queries.tablet ? 'space-left2' : 'space-left4 line-height15' }`}>
          {queries.desktop ? 'Example API Documentation' :
            queries.mobile ? 'API Docs' : 'Example API Docs'}
        </div>
        {queries.tablet && <div>
            <button
              onClick={this.toggleNav}
              className={`short quiet pin-topright micro button rcon ${showNav ? 'caret-up' : 'caret-down'} space-right1 space-top1`}>
              {activeSection}
            </button>
            {showNav && <div
              className='fixed-left fill-light pin-left col6 pad2 scroll-styled space-top5'>
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
