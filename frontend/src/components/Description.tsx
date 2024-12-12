'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Link
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {DescriptionTheme, StyledDialogTitle, StyledButton} from './MUIStyledComponents';

export default function Description() {
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<HTMLElement | null>(null);
  const moreButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };
  const onMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };
  const isMoreMenuOpen = Boolean(moreMenuAnchor);

  const [isHowToDialogOpen, setIsHowToDialogOpen] = useState<boolean>(false);
  const howToMenuClick = () => {
    setIsHowToDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onHowToDialogClose = () => {
    setIsHowToDialogOpen(false);
  };

  const [isCautionDialogOpen, setIsCautionDialogOpen] = useState<boolean>(false);
  const cautionMenuClick = () => {
    setIsCautionDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onCautionDialogClose = () => {
    setIsCautionDialogOpen(false);
  };

  const [isReferenceDialogOpen, setIsReferenceDialogOpen] = useState(false);
  const referenceMenuClick = () => {
    setIsReferenceDialogOpen(true);
    setMoreMenuAnchor(null);
  };
  const onReferenceDialogClose = () => {
    setIsReferenceDialogOpen(false);
  };

  return (
    <div className="Description ml-auto">
      <ThemeProvider theme={DescriptionTheme}>
        <CssBaseline />
        <IconButton
          size="small"
          aria-label="actions"
          sx={{color: 'white'}}
          onClick={moreButtonClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={moreMenuAnchor}
          open={isMoreMenuOpen}
          onClose={onMoreMenuClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
          <MenuItem onClick={howToMenuClick}>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            使い方
          </MenuItem>
          <MenuItem onClick={cautionMenuClick}>
            <ListItemIcon>
              <ErrorOutlineIcon />
            </ListItemIcon>
            注意点
          </MenuItem>
          <MenuItem onClick={referenceMenuClick}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            参考元
          </MenuItem>
        </Menu>
        <Dialog
          open={isHowToDialogOpen}
          onClose={onHowToDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>使い方</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">基本的な使い方</h3>
              </div>
              <hr className="mt-1 mb-2" />
              <div>
                {'　'}
                このツールは、食材バッグのスクリーンショットを画像として読み込み、目的のレシピを入力することで、食材数を管理します。
              </div>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onHowToDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isCautionDialogOpen}
          onClose={onCautionDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>注意点</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">画像認識について</h3>
              </div>
              <hr className="mt-1 mb-2" />
              <div>
                {'　'}
                このツールでは、OCR（光学文字認識）技術を用いて画像内の文字を認識し、食材数（現在）を更新します。ただし、文字が正しく読み取れない場合や、画像内に対応する食材名や食材数が存在しない場合、
                <strong>食材数 (現在) は一部更新されない</strong>
                点にご注意ください。以下に例を示します。
              </div>
              <br />
              <Image
                src="/DescriptionImages/OK1.jpg"
                alt="OK1"
                width={750}
                height={1294}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図1. 読み取り成功例 <small>(画像中の全ての食材が認識される)</small>
              </div>
              <br />
              <Image
                src="/DescriptionImages/NG1.jpg"
                alt="NG1"
                width={750}
                height={340}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図2. 読み取り失敗例1 <small>(最下段の食材名が途切れているため認識されない)</small>
              </div>
              <br />
              <Image
                src="/DescriptionImages/NG2.jpg"
                alt="NG2"
                width={750}
                height={337}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図3. 読み取り失敗例2{' '}
                <small>(最下段の食材数に対応する食材名が画像中に存在しないため認識されない)</small>
              </div>
              <br />
              <Image
                src="/DescriptionImages/NG3.jpg"
                alt="NG3"
                width={750}
                height={581}
                className="mx-auto w-1/2"
              />
              <div className="text-center">
                図4. 読み取り失敗例3 <small>(最上段の食材数が不鮮明なため認識されない)</small>
              </div>
              <br />
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-[#25d76b] mr-2"></div>
                <h3 className="font-bold text-base">その他注意点</h3>
              </div>
              <hr className="mt-1 mb-2" />
              <div>
                {'　'}
                OCRの画像認識にGoogle Cloud Vision
                APIの無料プランを使用しているため、1000枚/月の上限があります。そのため、
                <strong>枚数上限を超えると画像認識ができなくなります</strong>
                。利用回数が多ければ有料プランを検討します。
                <br />
                {'　'}
                また、ホスティングサービスとしてrender.comの無料プランを使用しているため、15分間のアイドル状態が続くとサーバーがスリープし、サーバーの復帰により
                <strong>ロードが極端に遅くなるときがあります</strong>
                。こちらも、利用回数が多ければ有料プランを検討します。
              </div>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onCautionDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isReferenceDialogOpen}
          onClose={onReferenceDialogClose}
          scroll="paper"
          aria-describedby="scroll-dialog-description"
        >
          <StyledDialogTitle>参考元</StyledDialogTitle>
          <DialogContent dividers>
            <div className="text-[#333]">
              <ul>
                <li>
                  <Link
                    href="https://pks.raenonx.cc/ja/meal"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    raenonX
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ny-an.github.io/gaogao-pksr/"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ポケスリ献立表 by がおがおぷーん
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com/SwabluPksl/status/1855185947790565437"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    レシピ表 by チル＠ポケスリ
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://nitoyon.github.io/pokesleep-tool/iv/index.ja.html"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    個体値計算機 by nitoyon
                  </Link>
                </li>
              </ul>
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={onReferenceDialogClose}>閉じる</StyledButton>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
